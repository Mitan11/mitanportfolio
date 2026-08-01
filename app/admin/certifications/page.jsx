"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function AdminCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', organization: '', description: '', order: 0
  });

  const fetchCerts = async () => {
    try {
      const res = await axios.get('/api/certifications');
      setCertifications(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await axios.put(`/api/certifications/${editingId}`, formData);
        toast.success('Certification updated successfully');
      } else {
        await axios.post('/api/certifications', formData);
        toast.success('Certification created successfully');
      }
      setIsModalOpen(false);
      fetchCerts();
    } catch (err) {
      toast.error('Error saving certification');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this certification?')) {
      try {
        await axios.delete(`/api/certifications/${id}`);
        toast.success('Certification deleted successfully');
        fetchCerts();
      } catch (err) {
        toast.error('Error deleting certification');
      }
    }
  };

  const openEdit = (cert) => {
    setFormData(cert);
    setEditingId(cert._id);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setFormData({ title: '', organization: '', description: '', order: 0 });
    setEditingId(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-white">Certifications</h1>
          <p className="text-sm text-slate-500">Manage your professional licenses and certifications.</p>
        </div>
        <Button onClick={openNew} className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/20 border-0">
          <IconPlus size={18} /> Add Certification
        </Button>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-slate-900/40 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-slate-500">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span className="text-sm">Loading certifications...</span>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certifications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No certifications found.
                  </TableCell>
                </TableRow>
              )}
              {certifications.map((cert) => (
                <TableRow key={cert._id}>
                  <TableCell className="font-medium">{cert.title}</TableCell>
                  <TableCell className="text-muted-foreground">{cert.organization}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(cert)}>
                        <IconEdit size={18} className="text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(cert._id)}>
                        <IconTrash size={18} className="text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] text-foreground">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Certification' : 'New Certification'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <fieldset disabled={saving} className="space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Certification Title</Label>
                <Input id="title" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input id="organization" required value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Sorting Order</Label>
              <Input id="order" type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea id="description" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>
            </fieldset>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/20 border-0">
                {saving ? 'Saving...' : 'Save Certification'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
