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

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', subtitle: '', description: '', link: '', github: '', image: '', features: '', techStack: '', order: 0
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...formData };
      
      // Convert features from newline separated string to array
      if (typeof payload.features === 'string') {
        payload.features = payload.features.split('\n').map(s => s.trim()).filter(Boolean);
      }
      
      // Convert techStack from comma separated string to array
      if (typeof payload.techStack === 'string') {
        payload.techStack = payload.techStack.split(',').map(s => s.trim()).filter(Boolean);
      }

      if (editingId) {
        await axios.put(`/api/projects/${editingId}`, payload);
        toast.success('Project updated successfully');
      } else {
        await axios.post('/api/projects', payload);
        toast.success('Project created successfully');
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      toast.error('Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/api/projects/${id}`);
        toast.success('Project deleted successfully');
        fetchProjects();
      } catch (err) {
        toast.error('Error deleting project');
      }
    }
  };

  const openEdit = (project) => {
    setFormData({
      ...project,
      features: Array.isArray(project.features) ? project.features.join('\n') : (project.features || ''),
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : (project.techStack || '')
    });
    setEditingId(project._id);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setFormData({ title: '', subtitle: '', description: '', link: '', github: '', image: '', features: '', techStack: '', order: 0 });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      
      const res = await axios.post('/api/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (res.data.url) {
        setFormData(prev => ({ ...prev, image: res.data.url }));
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Failed to get image URL');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-white">Projects</h1>
          <p className="text-sm text-slate-500">Manage your portfolio projects.</p>
        </div>
        <Button onClick={openNew} className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/20 border-0">
          <IconPlus size={18} /> Add Project
        </Button>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-slate-900/40 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-slate-500">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span className="text-sm">Loading projects...</span>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Title</TableHead>
                <TableHead className="hidden md:table-cell">Subtitle</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No projects found.
                  </TableCell>
                </TableRow>
              )}
              {projects.map((proj) => (
                <TableRow key={proj._id}>
                  <TableCell className="font-medium">{proj.title}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{proj.subtitle}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(proj)}>
                        <IconEdit size={18} className="text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(proj._id)}>
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
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto text-foreground">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Project' : 'New Project'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <fieldset disabled={saving} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  required 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input 
                  id="subtitle" 
                  value={formData.subtitle || ''} 
                  onChange={e => setFormData({...formData, subtitle: e.target.value})} 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                rows={3} 
                required
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="link">Live Link</Label>
                <Input 
                  id="link" 
                  placeholder="https://..."
                  value={formData.link || ''} 
                  onChange={e => setFormData({...formData, link: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub Link</Label>
                <Input 
                  id="github" 
                  placeholder="https://github.com/..."
                  value={formData.github || ''} 
                  onChange={e => setFormData({...formData, github: e.target.value})} 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <div className="flex gap-2">
                  <Input 
                    id="image" 
                    placeholder="/images/project1.png"
                    value={formData.image || ''} 
                    onChange={e => setFormData({...formData, image: e.target.value})} 
                  />
                  <div className="relative flex-shrink-0">
                    <Button type="button" variant="outline" disabled={isUploading} className="relative overflow-hidden cursor-pointer">
                      {isUploading ? 'Uploading...' : 'Upload'}
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Sorting Order</Label>
                <Input 
                  id="order" 
                  type="number" 
                  value={formData.order} 
                  onChange={e => setFormData({...formData, order: e.target.value})} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack (Comma separated)</Label>
              <Input 
                id="techStack" 
                placeholder="React, Next.js, Tailwind CSS"
                value={formData.techStack || ''} 
                onChange={e => setFormData({...formData, techStack: e.target.value})} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Key Features (One per line)</Label>
              <Textarea 
                id="features" 
                rows={4} 
                placeholder="Advanced Admin Dashboard&#10;Product Search & Smart Filtering"
                value={formData.features || ''} 
                onChange={e => setFormData({...formData, features: e.target.value})} 
              />
            </div>
            </fieldset>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/20 border-0">
                {saving ? 'Saving...' : 'Save Project'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
