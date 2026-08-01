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

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    role: '', company: '', period: '', description: '', skills: '', order: 0
  });

  const fetchExperiences = async () => {
    try {
      const res = await axios.get('/api/experiences');
      setExperiences(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...formData };
      if (typeof payload.skills === 'string') {
        payload.skills = payload.skills.split(',').map(s => s.trim()).filter(Boolean);
      }

      if (editingId) {
        await axios.put(`/api/experiences/${editingId}`, payload);
        toast.success('Experience updated successfully');
      } else {
        await axios.post('/api/experiences', payload);
        toast.success('Experience created successfully');
      }
      setIsModalOpen(false);
      fetchExperiences();
    } catch (err) {
      toast.error('Error saving experience');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        await axios.delete(`/api/experiences/${id}`);
        toast.success('Experience deleted successfully');
        fetchExperiences();
      } catch (err) {
        toast.error('Error deleting experience');
      }
    }
  };

  const openEdit = (exp) => {
    setFormData({
      ...exp,
      skills: Array.isArray(exp.skills) ? exp.skills.join(', ') : exp.skills
    });
    setEditingId(exp._id);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setFormData({ role: '', company: '', period: '', description: '', skills: '', order: 0 });
    setEditingId(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-white">Experience</h1>
          <p className="text-sm text-slate-500">Manage your work history.</p>
        </div>
        <Button onClick={openNew} className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/20 border-0">
          <IconPlus size={18} /> Add Experience
        </Button>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-slate-900/40 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-slate-500">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span className="text-sm">Loading experience...</span>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="hidden md:table-cell">Period</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experiences.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No experience records found.
                  </TableCell>
                </TableRow>
              )}
              {experiences.map((exp) => (
                <TableRow key={exp._id}>
                  <TableCell className="font-medium">{exp.role}</TableCell>
                  <TableCell>{exp.company}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{exp.period}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(exp)}>
                        <IconEdit size={18} className="text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(exp._id)}>
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
        <DialogContent className="sm:max-w-[600px] text-foreground">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Experience' : 'New Experience'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <fieldset disabled={saving} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role / Job Title</Label>
                <Input id="role" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="period">Period (e.g., 2020 - 2022)</Label>
                <Input id="period" required value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Order (Sorting)</Label>
                <Input id="order" type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea id="description" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (Comma separated)</Label>
              <Input id="skills" placeholder="React, Node.js, MongoDB" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} />
            </div>
            </fieldset>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/20 border-0">
                {saving ? 'Saving...' : 'Save Experience'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
