import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable, { Column, Action } from '@/components/common/DataTable';
import { artistAPI } from '@/services/api';
import { ArtistWork } from '@/types';

const ArtistMyMusic: React.FC = () => {
  const [rows, setRows] = useState<ArtistWork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await artistAPI.getMyMusic().catch(() => []);
        setRows(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cols: Column<ArtistWork>[] = [
    { key: 'title', header: 'Title', accessor: 'title' },
    { key: 'artist', header: 'Artist', accessor: 'artist' },
    { key: 'duration', header: 'Duration', accessor: 'duration' },
    { key: 'status', header: 'Status', accessor: (r) => r.status?.statusName || '-' },
  ];

  const actions: Action<ArtistWork>[] = [
    {
      label: 'Edit',
      onClick: async (item) => {
        // navigate to edit page if exists; for now, no-op
      },
      show: (item) => item.status?.statusName !== 'APPROVED'
    },
    {
      label: 'Delete',
      variant: 'destructive',
      onClick: async (item) => {
        await artistAPI.deleteMusic(item.id);
        setRows((prev) => prev.filter((r) => r.id !== item.id));
      }
    }
  ];

  return (
    <DashboardLayout title="My Music">
      {loading ? (
        <div className="h-32 bg-muted rounded-lg animate-pulse"></div>
      ) : (
        <DataTable data={rows} columns={cols} actions={actions} searchable emptyMessage="No music yet" />
      )}
    </DashboardLayout>
  );
};

export default ArtistMyMusic;

