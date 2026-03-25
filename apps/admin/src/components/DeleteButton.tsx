'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface DeleteButtonProps {
  endpoint: string;
  token: string;
  confirmMessage: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function DeleteButton({ endpoint, token, confirmMessage }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(confirmMessage)) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1${endpoint}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Deleted successfully');
      router.refresh();
    } catch {
      toast.error('Failed to delete');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
      title="Delete"
    >
      <Trash2 size={14} />
    </button>
  );
}
