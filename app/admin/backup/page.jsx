"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { IconDownload, IconUpload, IconDatabase, IconAlertTriangle } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function AdminBackup() {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/backup', {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error('Failed to export database');
      }

      // Get filename from header if possible, otherwise use a default
      const contentDisposition = response.headers.get('content-disposition');
      let filename = `mitan-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
      if (contentDisposition && contentDisposition.includes('filename=')) {
        filename = contentDisposition.split('filename=')[1].replace(/"/g, '');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast.success('Database exported successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to export database.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImport = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a backup file to restore.');
      return;
    }

    if (!confirm('WARNING: This will overwrite your existing database with the data from the backup file. Are you sure you want to proceed?')) {
      return;
    }

    setIsImporting(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/backup', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Database restored successfully!');
        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById('backup-file');
        if (fileInput) fileInput.value = '';
      } else {
        throw new Error(data.error || 'Failed to restore database');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Error restoring database.');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="max-w-4xl text-foreground pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Database Backup & Restore</h1>
        <p className="text-sm text-slate-500">Securely export your data or restore from a previous backup.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Export Section */}
        <Card className="border-white/[0.06] bg-slate-900/40 shadow-xl overflow-hidden h-fit">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <IconDownload size={20} />
              </div>
              <div>
                <CardTitle>Export Database</CardTitle>
                <CardDescription>Download a complete backup of your portfolio data.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                This will generate a JSON file containing all your settings, projects, experiences, skills, and certifications.
              </p>
              <Button 
                onClick={handleExport} 
                disabled={isExporting}
                className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-all duration-200"
              >
                {isExporting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Exporting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <IconDownload size={18} />
                    Download Backup File
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Import Section */}
        <Card className="border-white/[0.06] bg-slate-900/40 shadow-xl overflow-hidden h-fit">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <IconDatabase size={20} />
              </div>
              <div>
                <CardTitle>Restore Database</CardTitle>
                <CardDescription>Upload a backup file to restore data.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleImport} className="space-y-4">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-3 text-red-400 text-sm">
                <IconAlertTriangle size={20} className="shrink-0" />
                <p>Restoring a backup will <strong>overwrite and replace</strong> all existing data in the database. Proceed with caution.</p>
              </div>
              
              <div className="space-y-2">
                <label 
                  htmlFor="backup-file" 
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/[0.1] rounded-xl cursor-pointer bg-black/20 hover:bg-black/40 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <IconUpload className="w-8 h-8 mb-3 text-slate-400" />
                    <p className="mb-2 text-sm text-slate-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">JSON backup file only</p>
                  </div>
                  <input 
                    id="backup-file" 
                    type="file" 
                    accept=".json" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </label>
                {selectedFile && (
                  <div className="text-sm text-slate-300 flex items-center gap-2 px-1">
                    <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                    <span className="text-slate-500">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={isImporting || !selectedFile}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium shadow-lg shadow-purple-500/20 transition-all duration-200 disabled:opacity-50"
              >
                {isImporting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Restoring...
                  </span>
                ) : (
                  'Restore Database'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
