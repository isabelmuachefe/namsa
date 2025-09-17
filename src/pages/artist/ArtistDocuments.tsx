import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { artistAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const ArtistDocuments: React.FC = () => {
  const [uploads, setUploads] = useState<Record<string, File | null>>({});
  const [titles, setTitles] = useState<Record<string, string>>({
    passportPhoto: 'Passport Photo',
    idDocument: 'ID Document',
    bankConfirmationLetter: 'Bank Confirmation Letter',
    proofOfPayment: 'Proof of Payment',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [documents, setDocuments] = useState<any>({});
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const docs = await artistAPI.getDocuments();
        setDocuments(docs);
      } catch (error) {
        // Documents don't exist yet
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleUpload = async () => {
    try {
      setSaving(true);
      const uploadPromises = [];
      
      if (uploads.passportPhoto) {
        uploadPromises.push(
          artistAPI.uploadPassportPhoto(uploads.passportPhoto, titles.passportPhoto)
        );
      }
      if (uploads.idDocument) {
        uploadPromises.push(
          artistAPI.uploadIdDocument(uploads.idDocument, titles.idDocument)
        );
      }
      if (uploads.bankConfirmationLetter) {
        uploadPromises.push(
          artistAPI.uploadBankConfirmationLetter(uploads.bankConfirmationLetter, titles.bankConfirmationLetter)
        );
      }
      if (uploads.proofOfPayment) {
        uploadPromises.push(
          artistAPI.uploadProofOfPayment(uploads.proofOfPayment, titles.proofOfPayment)
        );
      }

      if (uploadPromises.length === 0) {
        toast({
          title: "No Files Selected",
          description: "Please select at least one file to upload",
          variant: "destructive",
        });
        return;
      }

      await Promise.all(uploadPromises);
      
      setUploads({});
      toast({
        title: "Upload Successful",
        description: "Documents uploaded successfully!",
      });
      
      // Reload documents
      const docs = await artistAPI.getDocuments();
      setDocuments(docs);
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error?.response?.data?.message || "Failed to upload documents",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const clearFile = (key: string) => setUploads((u) => ({ ...u, [key]: null }));

  if (loading) {
    return (
      <DashboardLayout title="Documents">
        <div className="h-32 bg-muted rounded-lg animate-pulse"></div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Documents">
      <div className="space-y-6">
        {/* Current Documents */}
        {(documents.passportPhoto || documents.idDocument || documents.bankConfirmationLetter || documents.proofOfPayment) && (
          <Card>
            <CardHeader>
              <CardTitle>Current Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {documents.passportPhoto && (
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Passport Photo</p>
                    <p className="text-sm text-gray-500">{documents.passportPhoto.imageTitle}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => window.open(documents.passportPhoto.imageUrl, '_blank')}>
                    View
                  </Button>
                </div>
              )}
              {documents.idDocument && (
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">ID Document</p>
                    <p className="text-sm text-gray-500">{documents.idDocument.documentTitle}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => window.open(documents.idDocument.fileUrl, '_blank')}>
                    View
                  </Button>
                </div>
              )}
              {documents.bankConfirmationLetter && (
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Bank Confirmation Letter</p>
                    <p className="text-sm text-gray-500">{documents.bankConfirmationLetter.documentTitle}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => window.open(documents.bankConfirmationLetter.fileUrl, '_blank')}>
                    View
                  </Button>
                </div>
              )}
              {documents.proofOfPayment && (
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Proof of Payment</p>
                    <p className="text-sm text-gray-500">{documents.proofOfPayment.documentTitle}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => window.open(documents.proofOfPayment.fileUrl, '_blank')}>
                    View
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Upload New Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Required Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="passportPhoto">Passport Photo (Image)</Label>
                <Input
                  type="text"
                  placeholder="Document Title"
                  value={titles.passportPhoto}
                  onChange={(e) => setTitles((t) => ({ ...t, passportPhoto: e.target.value }))}
                />
                <Input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setUploads((u) => ({ ...u, passportPhoto: e.target.files?.[0] || null }))} 
                />
                {uploads.passportPhoto && (
                  <div className="text-sm mt-1 flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{uploads.passportPhoto.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => clearFile('passportPhoto')}>Remove</Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="idDocument">ID Document (PDF)</Label>
                <Input
                  type="text"
                  placeholder="Document Title"
                  value={titles.idDocument}
                  onChange={(e) => setTitles((t) => ({ ...t, idDocument: e.target.value }))}
                />
                <Input 
                  type="file" 
                  accept="application/pdf" 
                  onChange={(e) => setUploads((u) => ({ ...u, idDocument: e.target.files?.[0] || null }))} 
                />
                {uploads.idDocument && (
                  <div className="text-sm mt-1 flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{uploads.idDocument.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => clearFile('idDocument')}>Remove</Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankConfirmationLetter">Bank Confirmation Letter (PDF)</Label>
                <Input
                  type="text"
                  placeholder="Document Title"
                  value={titles.bankConfirmationLetter}
                  onChange={(e) => setTitles((t) => ({ ...t, bankConfirmationLetter: e.target.value }))}
                />
                <Input 
                  type="file" 
                  accept="application/pdf" 
                  onChange={(e) => setUploads((u) => ({ ...u, bankConfirmationLetter: e.target.files?.[0] || null }))} 
                />
                {uploads.bankConfirmationLetter && (
                  <div className="text-sm mt-1 flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{uploads.bankConfirmationLetter.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => clearFile('bankConfirmationLetter')}>Remove</Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="proofOfPayment">Proof of Payment (PDF)</Label>
                <Input
                  type="text"
                  placeholder="Document Title"
                  value={titles.proofOfPayment}
                  onChange={(e) => setTitles((t) => ({ ...t, proofOfPayment: e.target.value }))}
                />
                <Input 
                  type="file" 
                  accept="application/pdf" 
                  onChange={(e) => setUploads((u) => ({ ...u, proofOfPayment: e.target.files?.[0] || null }))} 
                />
                {uploads.proofOfPayment && (
                  <div className="text-sm mt-1 flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{uploads.proofOfPayment.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => clearFile('proofOfPayment')}>Remove</Button>
                  </div>
                )}
              </div>
            </div>

            <Button 
              onClick={handleUpload} 
              disabled={saving || Object.values(uploads).every(file => !file)}
              className="w-full"
            >
              {saving ? 'Uploading...' : 'Upload Documents'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ArtistDocuments;

