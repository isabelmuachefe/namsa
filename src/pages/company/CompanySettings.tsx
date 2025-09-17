import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { companyAPI } from '@/services/api';
import { Company } from '@/types';
import { Building2, Save, User, Lock, Mail, Phone, MapPin } from 'lucide-react';

const CompanySettings: React.FC = () => {
  const [profile, setProfile] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await companyAPI.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
        toast({
          title: "Error",
          description: "Failed to load company profile",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [toast]);

  const handleSave = async () => {
    if (!profile) return;
    
    try {
      setSaving(true);
      await companyAPI.updateProfile(profile);
      toast({
        title: "Success",
        description: "Company profile updated successfully",
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast({
        title: "Error",
        description: "Failed to update company profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Company Settings">
        <div className="space-y-6 animate-pulse">
          <div className="h-32 bg-muted rounded-lg"></div>
          <div className="h-96 bg-muted rounded-lg"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Company Settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Settings</h1>
          <p className="text-muted-foreground">
            Manage your company profile and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Company Profile */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
                <CardDescription>
                  Update your company details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={profile?.companyName || ''}
                      onChange={(e) => setProfile(prev => prev ? {...prev, companyName: e.target.value} : null)}
                      placeholder="Enter company name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Company Email</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={profile?.companyEmail || ''}
                      onChange={(e) => setProfile(prev => prev ? {...prev, companyEmail: e.target.value} : null)}
                      placeholder="Enter company email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">Company Phone</Label>
                    <Input
                      id="companyPhone"
                      value={profile?.companyPhone || ''}
                      onChange={(e) => setProfile(prev => prev ? {...prev, companyPhone: e.target.value} : null)}
                      placeholder="Enter company phone"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      value={profile?.contactPerson || ''}
                      onChange={(e) => setProfile(prev => prev ? {...prev, contactPerson: e.target.value} : null)}
                      placeholder="Enter contact person"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Company Address</Label>
                  <Textarea
                    id="companyAddress"
                    value={profile?.companyAddress || ''}
                    onChange={(e) => setProfile(prev => prev ? {...prev, companyAddress: e.target.value} : null)}
                    placeholder="Enter company address"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={saving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Lock className="h-4 w-4" />
                  Change Password
                </Button>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Mail className="h-4 w-4" />
                  Update Email
                </Button>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Verify Phone
                </Button>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <MapPin className="h-4 w-4" />
                  Update Address
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Account ID:</span>
                  <span className="font-mono">{profile?.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{profile?.user?.createdAt ? new Date(profile.user.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="text-namsa-success">Active</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanySettings;