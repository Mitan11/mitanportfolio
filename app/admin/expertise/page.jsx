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

export default function AdminExpertise() {
  const [expertiseList, setExpertiseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    expertiseId: '01', title: '', text: '', order: 0
  });

  const fetchExpertise = async () => {
    try {
      const res = await axios.get('/api/expertise');
      setExpertiseList(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpertise();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await axios.put(`/api/expertise/${editingId}`, formData);
        toast.success('Expertise card updated successfully');
      } else {
        await axios.post('/api/expertise', formData);
        toast.success('Expertise card created successfully');
      }
      setIsModalOpen(false);
      fetchExpertise();
    } catch (err) {
      toast.error('Error saving expertise card');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this card?')) {
      try {
        await axios.delete(`/api/expertise/${id}`);
        toast.success('Expertise card deleted successfully');
        fetchExpertise();
      } catch (err) {
        toast.error('Error deleting expertise card');
      }
    }
  };

  const openEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setIsModalOpen(true);
  };

  const openNew = () => {
    const nextId = String(expertiseList.length + 1).padStart(2, '0');
    setFormData({ expertiseId: nextId, title: '', text: '', order: 0 });
    setEditingId(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-white">Expertise</h1>
          <p className="text-sm text-slate-500">Manage your core expertise areas.</p>
        </div>
        <Button onClick={openNew} className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/20 border-0">
          <IconPlus size={18} /> Add Expertise
        </Button>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-slate-900/40 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-slate-500">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span className="text-sm">Loading expertise...</span>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Text</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expertiseList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No expertise records found.
                  </TableCell>
                </TableRow>
              )}
              {expertiseList.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium text-muted-foreground">{item.expertiseId}</TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground truncate max-w-xs">{item.text}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                        <IconEdit size={18} className="text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item._id)}>
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
            <DialogTitle>{editingId ? 'Edit Expertise Card' : 'New Expertise Card'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <fieldset disabled={saving} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expertiseId">Display Number (e.g. 01)</Label>
                <Input id="expertiseId" required value={formData.expertiseId} onChange={e => setFormData({...formData, expertiseId: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Sorting Order</Label>
                <Input id="order" type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Expertise Title</Label>
              <Input id="title" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="text">Description Text</Label>
              <Textarea id="text" rows={4} value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} />
            </div>
            </fieldset>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/20 border-0">
                {saving ? 'Saving...' : 'Save Card'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
