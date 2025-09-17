import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authAPI } from '@/services/api';

const ArtistSettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    try {
      setLoading(true);
      await authAPI.changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Settings">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <Button onClick={handleChangePassword} disabled={loading || !currentPassword || !newPassword}>{loading ? 'Updating...' : 'Update Password'}</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ArtistSettings;

