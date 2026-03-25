'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Upload, Copy, Trash2, Search, X } from 'lucide-react';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
  createdAt: string;
}

interface MediaLibraryProps {
  token: string;
  onSelect?: (file: MediaFile) => void;
}

export default function MediaLibrary({ token, onSelect }: MediaLibraryProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<MediaFile | null>(null);
  const [editAlt, setEditAlt] = useState('');

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: String(page),
        limit: '20',
        ...(search && { search }),
      });
      const res = await fetch(`${API_URL}/api/v1/media?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFiles(data.data || []);
      setTotal(data.total || 0);
    } catch {
      toast.error('Failed to load media files');
    } finally {
      setLoading(false);
    }
  }, [page, search, token]);

  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch(`${API_URL}/api/v1/media/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (!res.ok) throw new Error('Upload failed');
        toast.success(`Uploaded ${file.name}`);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    setUploading(false);
    fetchFiles();
  }, [token, fetchFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': [],
      'video/*': [],
    },
  });

  async function deleteFile(id: string) {
    if (!confirm('Delete this file?')) return;
    try {
      await fetch(`${API_URL}/api/v1/media/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('File deleted');
      setSelected(null);
      fetchFiles();
    } catch {
      toast.error('Failed to delete file');
    }
  }

  async function saveAltText(id: string) {
    try {
      await fetch(`${API_URL}/api/v1/media/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ altText: editAlt }),
      });
      toast.success('Alt text saved');
      setSelected((prev) => prev ? { ...prev, altText: editAlt } : null);
      fetchFiles();
    } catch {
      toast.error('Failed to save alt text');
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  return (
    <div className="flex gap-4 h-[calc(100vh-160px)]">
      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Upload zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 mb-4 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto mb-2 text-muted-foreground" size={24} />
          <p className="text-sm text-muted-foreground">
            {uploading ? 'Uploading...' : isDragActive ? 'Drop files here' : 'Drag & drop files or click to upload'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Images, PDFs, Videos • Max 10MB</p>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="field-input pl-9"
            />
          </div>
          <span className="text-sm text-muted-foreground self-center">{total} files</span>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No files found</div>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
              {files.map((file) => (
                <button
                  key={file.id}
                  onClick={() => {
                    setSelected(file);
                    setEditAlt(file.altText || '');
                    if (onSelect) onSelect(file);
                  }}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selected?.id === file.id ? 'border-primary' : 'border-transparent hover:border-muted-foreground'
                  }`}
                >
                  {file.mimeType.startsWith('image/') ? (
                    <Image
                      src={file.url}
                      alt={file.altText || file.originalName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex flex-col items-center justify-center">
                      <span className="text-2xl">📄</span>
                      <span className="text-xs text-muted-foreground mt-1 truncate px-1">
                        {file.originalName}
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {total > 20 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-8 px-3 rounded border border-border text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="h-8 flex items-center text-sm text-muted-foreground">
              Page {page} of {Math.ceil(total / 20)}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= Math.ceil(total / 20)}
              className="h-8 px-3 rounded border border-border text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="w-72 shrink-0 border border-border rounded-xl bg-card overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-border">
            <span className="font-medium text-sm">File Details</span>
            <button onClick={() => setSelected(null)} className="p-1 hover:bg-accent rounded">
              <X size={14} />
            </button>
          </div>
          <div className="p-4 space-y-4">
            {selected.mimeType.startsWith('image/') && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                <Image src={selected.url} alt={selected.altText || ''} fill className="object-contain" />
              </div>
            )}
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><span className="font-medium text-foreground">Name:</span> {selected.originalName}</p>
              <p><span className="font-medium text-foreground">Type:</span> {selected.mimeType}</p>
              <p><span className="font-medium text-foreground">Size:</span> {formatSize(selected.size)}</p>
              {selected.width && <p><span className="font-medium text-foreground">Dimensions:</span> {selected.width}×{selected.height}</p>}
              <p><span className="font-medium text-foreground">Uploaded:</span> {new Date(selected.createdAt).toLocaleDateString()}</p>
            </div>

            <div>
              <label className="text-xs font-medium mb-1 block">Alt Text</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editAlt}
                  onChange={(e) => setEditAlt(e.target.value)}
                  className="field-input flex-1 text-xs"
                />
                <button
                  onClick={() => saveAltText(selected.id)}
                  className="h-9 px-3 bg-primary text-white rounded-md text-xs"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => copyUrl(selected.url)}
                className="w-full flex items-center gap-2 justify-center h-8 border border-border rounded-md text-xs hover:bg-accent"
              >
                <Copy size={12} /> Copy URL
              </button>
              <button
                onClick={() => deleteFile(selected.id)}
                className="w-full flex items-center gap-2 justify-center h-8 border border-destructive/30 text-destructive rounded-md text-xs hover:bg-destructive/10"
              >
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
