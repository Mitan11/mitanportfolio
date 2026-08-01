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

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    category: '', description: '', skills: '', colSpan: '', bgColor: '', borderColor: '', order: 0
  });

  const fetchSkills = async () => {
    try {
      const res = await axios.get('/api/skills');
      setSkills(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
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
        await axios.put(`/api/skills/${editingId}`, payload);
        toast.success('Skill category updated successfully');
      } else {
        await axios.post('/api/skills', payload);
        toast.success('Skill category created successfully');
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (err) {
      toast.error('Error saving skills');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this skill category?')) {
      try {
        await axios.delete(`/api/skills/${id}`);
        toast.success('Skill category deleted successfully');
        fetchSkills();
      } catch (err) {
        toast.error('Error deleting skills');
      }
    }
  };

  const openEdit = (skillGroup) => {
    setFormData({
      ...skillGroup,
      skills: Array.isArray(skillGroup.skills) ? skillGroup.skills.join(', ') : (skillGroup.skills || '')
    });
    setEditingId(skillGroup._id);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setFormData({ category: '', description: '', skills: '', colSpan: '', bgColor: '', borderColor: '', order: 0 });
    setEditingId(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-white">Skills</h1>
          <p className="text-sm text-slate-500">Manage your technical skills by category.</p>
        </div>
        <Button onClick={openNew} className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/20 border-0">
          <IconPlus size={18} /> Add Skill Category
        </Button>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-slate-900/40 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-slate-500">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span className="text-sm">Loading skills...</span>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Skills</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No skills found.
                  </TableCell>
                </TableRow>
              )}
              {skills.map((group) => (
                <TableRow key={group._id}>
                  <TableCell className="font-medium">{group.category}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    <div className="flex flex-wrap gap-1">
                      {(group.skills || []).map((item, i) => (
                        <span key={i} className="inline-block bg-white/[0.06] text-slate-300 text-xs px-2.5 py-1 rounded-lg border border-white/[0.05]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(group)}>
                        <IconEdit size={18} className="text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(group._id)}>
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
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto text-foreground">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Skill Category' : 'New Skill Category'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <fieldset disabled={saving} className="space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category Name</Label>
                <Input id="category" placeholder="e.g. Frontend Development" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Sorting Order</Label>
                <Input id="order" type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={2} placeholder="Building responsive..." value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (Comma separated)</Label>
              <Textarea id="skills" rows={3} placeholder="React, Vue, Tailwind" required value={formData.skills || ''} onChange={e => setFormData({...formData, skills: e.target.value})} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2 relative">
                <Label>Grid Col Span</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                  value={formData.colSpan || ''}
                  onChange={e => setFormData({...formData, colSpan: e.target.value})}
                >
                  <option value="" disabled>Select span</option>
                  <option value="md:col-span-1 lg:col-span-1">1 Column</option>
                  <option value="md:col-span-2 lg:col-span-1">2 Col (Tablet), 1 Col (Desktop)</option>
                  <option value="md:col-span-2 lg:col-span-2">2 Columns</option>
                  <option value="md:col-span-3 lg:col-span-2">3 Col (Tablet), 2 Col (Desktop)</option>
                  <option value="md:col-span-3 lg:col-span-3">3 Columns</option>
                </select>
              </div>

              <div className="space-y-2 relative">
                <Label>Background Color</Label>
                <div className="relative group/dropdown">
                  <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer">
                    <div className="flex items-center gap-2">
                      {formData.bgColor && <div className={`w-4 h-4 rounded-full border border-white/20 ${formData.bgColor.split('/')[0]}`} />}
                      <span className="truncate">{formData.bgColor || 'Select bg'}</span>
                    </div>
                  </div>
                  <div className="absolute top-full left-0 mt-1 w-full bg-[#1a1a1a] border border-white/10 rounded-md shadow-xl z-50 hidden group-hover/dropdown:block max-h-48 overflow-y-auto">
                    {['bg-blue-50/60', 'bg-purple-50/60', 'bg-pink-50/60', 'bg-green-50/60', 'bg-orange-50/60', 'bg-yellow-50/60', 'bg-teal-50/60', 'bg-gray-50/60', 'bg-red-50/60', 'bg-indigo-50/60'].map(bg => (
                      <div 
                        key={bg} 
                        className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 cursor-pointer text-sm"
                        onClick={() => setFormData({...formData, bgColor: bg})}
                      >
                        <div className={`w-4 h-4 rounded-full border border-white/20 ${bg.split('/')[0]}`} />
                        <span>{bg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 relative">
                <Label>Border Color</Label>
                <div className="relative group/dropdown">
                  <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer">
                    <div className="flex items-center gap-2">
                      {formData.borderColor && <div className={`w-4 h-4 rounded-full border-2 ${formData.borderColor} bg-transparent`} />}
                      <span className="truncate">{formData.borderColor || 'Select border'}</span>
                    </div>
                  </div>
                  <div className="absolute top-full left-0 mt-1 w-full bg-[#1a1a1a] border border-white/10 rounded-md shadow-xl z-50 hidden group-hover/dropdown:block max-h-48 overflow-y-auto">
                    {['border-blue-100', 'border-purple-100', 'border-pink-100', 'border-green-100', 'border-orange-100', 'border-yellow-100', 'border-teal-100', 'border-gray-100', 'border-red-100', 'border-indigo-100'].map(border => (
                      <div 
                        key={border} 
                        className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 cursor-pointer text-sm"
                        onClick={() => setFormData({...formData, borderColor: border})}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 ${border} bg-transparent`} />
                        <span>{border}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </fieldset>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/20 border-0">
                {saving ? 'Saving...' : 'Save Category'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
