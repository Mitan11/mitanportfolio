"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('/api/settings');
      if (res.data.data && res.data.data.length > 0) {
        setSettings(res.data.data[0]);
      } else {
        setSettings({ 
          navbar: { links: [] }, 
          hero: {}, 
          about: {}, 
          expertise: {},
          experience: {},
          skills: {},
          projects: {},
          certifications: {},
          contact: { socials: {} }, 
          footer: { links: [] } 
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...settings };
      // Parse comma separated navbar links
      if (typeof payload.navbar?.links === 'string') {
        payload.navbar.links = payload.navbar.links.split(',').map(s => s.trim()).filter(Boolean);
      }
      
      // Parse comma separated seo keywords
      if (typeof payload.seo?.keywords === 'string') {
        payload.seo.keywords = payload.seo.keywords.split(',').map(s => s.trim()).filter(Boolean);
      }
      
      if (settings._id) {
        await axios.put(`/api/settings/${settings._id}`, payload);
      } else {
        await axios.post('/api/settings', payload);
      }
      toast.success('Settings saved successfully!');
    } catch (err) {
      toast.error('Error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  const updateNested = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [field]: value
      }
    }));
  };

  const updateSocial = (network, value) => {
    setSettings(prev => {
      const currentContact = prev?.contact || {};
      const currentSocials = currentContact.socials || {};
      return {
        ...prev,
        contact: {
          ...currentContact,
          socials: {
            ...currentSocials,
            [network]: value
          }
        }
      };
    });
  };

  const updateFooterLink = (index, key, value) => {
    const newLinks = [...(settings?.footer?.links || [])];
    if (!newLinks[index]) newLinks[index] = { name: '', url: '' };
    newLinks[index][key] = value;
    updateNested('footer', 'links', newLinks);
  };
  
  const addFooterLink = () => {
    const newLinks = [...(settings?.footer?.links || []), { name: '', url: '' }];
    updateNested('footer', 'links', newLinks);
  };
  
  const removeFooterLink = (index) => {
    const newLinks = [...(settings?.footer?.links || [])];
    newLinks.splice(index, 1);
    updateNested('footer', 'links', newLinks);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="flex items-center gap-3 text-slate-500">
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-sm">Loading settings...</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl text-foreground pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">General Settings</h1>
        <p className="text-sm text-slate-500">Update global text, headings, and links across your portfolio.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <fieldset disabled={saving} className="space-y-6">
        
          <Tabs defaultValue="global" className="w-full">
            <TabsList className="mb-6 flex flex-wrap h-auto w-full justify-start gap-1.5 bg-slate-900/60 border border-white/[0.06] rounded-xl p-1.5">
              <TabsTrigger value="global" className="rounded-lg px-4 py-2 text-xs font-medium">Global & Hero</TabsTrigger>
              <TabsTrigger value="sections" className="rounded-lg px-4 py-2 text-xs font-medium">Sections Text</TabsTrigger>
              <TabsTrigger value="contact" className="rounded-lg px-4 py-2 text-xs font-medium">Contact & Social</TabsTrigger>
              <TabsTrigger value="seo" className="rounded-lg px-4 py-2 text-xs font-medium">SEO Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="global" className="space-y-8 mt-4">
        {/* Navbar Section */}
        <Card className="border-white/[0.06] bg-slate-900/40 shadow-xl overflow-hidden">
          <CardHeader>
            <CardTitle>Navbar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nav-links">Navbar Links (Comma separated)</Label>
              <Input 
                id="nav-links"
                value={Array.isArray(settings?.navbar?.links) ? settings.navbar.links.join(', ') : settings?.navbar?.links || ''} 
                onChange={e => updateNested('navbar', 'links', e.target.value)} 
                placeholder="Home, About, Expertise, Experience, Skills, Projects, Certifications"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nav-resume">Resume Drive Link</Label>
              <Input 
                id="nav-resume"
                value={settings?.navbar?.resumeLink || ''} 
                onChange={e => updateNested('navbar', 'resumeLink', e.target.value)} 
                placeholder="https://drive.google.com/..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <Card className="border-white/[0.06] bg-slate-900/40 shadow-xl overflow-hidden">
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero-heading">Heading</Label>
              <Input 
                id="hero-heading"
                value={settings?.hero?.heading || ''} 
                onChange={e => updateNested('hero', 'heading', e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-subheading">Subheading</Label>
              <Textarea 
                id="hero-subheading"
                rows={3} 
                value={settings?.hero?.subheading || ''} 
                onChange={e => updateNested('hero', 'subheading', e.target.value)} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hero-primary-btn">Primary Button Text</Label>
                <Input 
                  id="hero-primary-btn"
                  value={settings?.hero?.primaryButtonText || ''} 
                  onChange={e => updateNested('hero', 'primaryButtonText', e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-primary-link">Primary Button Link</Label>
                <Input 
                  id="hero-primary-link"
                  value={settings?.hero?.primaryButtonLink || ''} 
                  onChange={e => updateNested('hero', 'primaryButtonLink', e.target.value)} 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hero-secondary-btn">Secondary Button Text</Label>
                <Input 
                  id="hero-secondary-btn"
                  value={settings?.hero?.secondaryButtonText || ''} 
                  onChange={e => updateNested('hero', 'secondaryButtonText', e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-secondary-link">Secondary Button Link</Label>
                <Input 
                  id="hero-secondary-link"
                  value={settings?.hero?.secondaryButtonLink || ''} 
                  onChange={e => updateNested('hero', 'secondaryButtonLink', e.target.value)} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="border-white/[0.06] bg-slate-900/40 shadow-xl overflow-hidden">
          <CardHeader>
            <CardTitle>About Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="about-name">Name</Label>
                <Input 
                  id="about-name"
                  value={settings?.about?.name || ''} 
                  onChange={e => updateNested('about', 'name', e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-title">Title</Label>
                <Input 
                  id="about-title"
                  value={settings?.about?.title || ''} 
                  onChange={e => updateNested('about', 'title', e.target.value)} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="about-description">Description</Label>
              <Textarea 
                id="about-description"
                rows={4} 
                value={settings?.about?.description || ''} 
                onChange={e => updateNested('about', 'description', e.target.value)} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Footer Section - Moved to Global Tab */}
        <Card className="border-white/[0.06] bg-slate-900/40 shadow-xl overflow-hidden">
          <CardHeader>
            <CardTitle>Footer Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="footer-brandName">Brand Name</Label>
                <Input 
                  id="footer-brandName"
                  value={settings?.footer?.brandName || ''} 
                  onChange={e => updateNested('footer', 'brandName', e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="footer-copyright">Copyright Text</Label>
                <Input 
                  id="footer-copyright"
                  value={settings?.footer?.copyright || ''} 
                  onChange={e => updateNested('footer', 'copyright', e.target.value)} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="footer-tagline">Tagline</Label>
              <Textarea 
                id="footer-tagline"
                rows={2} 
                value={settings?.footer?.tagline || ''} 
                onChange={e => updateNested('footer', 'tagline', e.target.value)} 
              />
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium">Footer Links</h4>
                <Button type="button" variant="outline" size="sm" onClick={addFooterLink}>
                  <IconPlus size={16} className="mr-1" /> Add Link
                </Button>
              </div>
              
              <div className="space-y-3">
                {settings?.footer?.links?.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No links added.</p>
                )}
                {settings?.footer?.links?.map((link, idx) => (
                  <div key={idx} className="flex gap-3 items-end">
                    <div className="space-y-1 flex-1">
                      <Label className="text-xs">Name</Label>
                      <Input 
                        value={link.name} 
                        onChange={e => updateFooterLink(idx, 'name', e.target.value)} 
                        placeholder="e.g. GitHub"
                      />
                    </div>
                    <div className="space-y-1 flex-1">
                      <Label className="text-xs">URL</Label>
                      <Input 
                        value={link.url} 
                        onChange={e => updateFooterLink(idx, 'url', e.target.value)} 
                        placeholder="https://..."
                      />
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeFooterLink(idx)}>
                      <IconTrash size={18} className="text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

            </TabsContent>
            
            <TabsContent value="sections" className="space-y-8 mt-4">
        {/* Dynamic Section Headings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <Card className="border-white/[0.06] bg-slate-900/40 shadow-xl overflow-hidden">
            <CardHeader><CardTitle>Expertise Headings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Header Title</Label>
                <Input value={settings?.expertise?.headerTitle || ''} onChange={e => updateNested('expertise', 'headerTitle', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Heading</Label>
                <Input value={settings?.expertise?.heading || ''} onChange={e => updateNested('expertise', 'heading', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={3} value={settings?.expertise?.description || ''} onChange={e => updateNested('expertise', 'description', e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/[0.06] bg-slate-900/40 shadow-xl overflow-hidden">
            <CardHeader><CardTitle>Experience Headings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Header Title</Label>
                <Input value={settings?.experience?.headerTitle || ''} onChange={e => updateNested('experience', 'headerTitle', e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/[0.06] bg-slate-900/40 shadow-xl overflow-hidden">
            <CardHeader><CardTitle>Skills Headings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Header Title</Label>
                <Input value={settings?.skills?.headerTitle || ''} onChange={e => updateNested('skills', 'headerTitle', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Heading Start</Label>
                <Input value={settings?.skills?.headingStart || ''} onChange={e => updateNested('skills', 'headingStart', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Heading Highlight</Label>
                <Input value={settings?.skills?.headingHighlight || ''} onChange={e => updateNested('skills', 'headingHighlight', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={2} value={settings?.skills?.description || ''} onChange={e => updateNested('skills', 'description', e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/[0.06] bg-slate-900/40 shadow-xl overflow-hidden">
            <CardHeader><CardTitle>Projects Headings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Header Title</Label>
                <Input value={settings?.projects?.headerTitle || ''} onChange={e => updateNested('projects', 'headerTitle', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Heading</Label>
                <Input value={settings?.projects?.heading || ''} onChange={e => updateNested('projects', 'heading', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={3} value={settings?.projects?.description || ''} onChange={e => updateNested('projects', 'description', e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/[0.06] bg-slate-900/40 shadow-xl overflow-hidden">
            <CardHeader><CardTitle>Certifications Headings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Header Title</Label>
                <Input value={settings?.certifications?.headerTitle || ''} onChange={e => updateNested('certifications', 'headerTitle', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Heading Start</Label>
                <Input value={settings?.certifications?.headingStart || ''} onChange={e => updateNested('certifications', 'headingStart', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Heading Highlight</Label>
                <Input value={settings?.certifications?.headingHighlight || ''} onChange={e => updateNested('certifications', 'headingHighlight', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={2} value={settings?.certifications?.description || ''} onChange={e => updateNested('certifications', 'description', e.target.value)} />
              </div>
            </CardContent>
          </Card>

        </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-8 mt-4">
        {/* Contact Section */}
        <Card className="border-white/[0.06] bg-slate-900/40 shadow-xl overflow-hidden">
          <CardHeader>
            <CardTitle>Contact Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-heading">Section Heading</Label>
                <Input 
                  id="contact-heading"
                  value={settings?.contact?.heading || ''} 
                  onChange={e => updateNested('contact', 'heading', e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-formHeading">Form Heading</Label>
                <Input 
                  id="contact-formHeading"
                  value={settings?.contact?.formHeading || ''} 
                  onChange={e => updateNested('contact', 'formHeading', e.target.value)} 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email Address</Label>
                <Input 
                  id="contact-email"
                  type="email"
                  value={settings?.contact?.email || ''} 
                  onChange={e => updateNested('contact', 'email', e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-location">Location</Label>
                <Input 
                  id="contact-location"
                  value={settings?.contact?.location || ''} 
                  onChange={e => updateNested('contact', 'location', e.target.value)} 
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-medium mb-4">Social Links</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="social-github">GitHub</Label>
                  <Input 
                    id="social-github"
                    value={settings?.contact?.socials?.github || ''} 
                    onChange={e => updateSocial('github', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="social-linkedin">LinkedIn</Label>
                  <Input 
                    id="social-linkedin"
                    value={settings?.contact?.socials?.linkedin || ''} 
                    onChange={e => updateSocial('linkedin', e.target.value)} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="social-instagram">Instagram</Label>
                  <Input 
                    id="social-instagram"
                    value={settings?.contact?.socials?.instagram || ''} 
                    onChange={e => updateSocial('instagram', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="social-facebook">Facebook</Label>
                  <Input 
                    id="social-facebook"
                    value={settings?.contact?.socials?.facebook || ''} 
                    onChange={e => updateSocial('facebook', e.target.value)} 
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-8 mt-4">
        {/* SEO Section */}
        <Card className="border-white/[0.06] bg-slate-900/40 shadow-xl overflow-hidden">
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="seo-title">Site Title</Label>
                <Input 
                  id="seo-title"
                  value={settings?.seo?.title || ''} 
                  onChange={e => updateNested('seo', 'title', e.target.value)} 
                  placeholder="Mitan Tank | Full Stack Developer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-keywords">Keywords (Comma separated)</Label>
                <Input 
                  id="seo-keywords"
                  value={Array.isArray(settings?.seo?.keywords) ? settings.seo.keywords.join(', ') : (settings?.seo?.keywords || '')} 
                  onChange={e => updateNested('seo', 'keywords', e.target.value)} 
                  placeholder="React, Next.js, Developer..."
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="seo-description">Site Description</Label>
              <Textarea 
                id="seo-description"
                rows={2} 
                value={settings?.seo?.description || ''} 
                onChange={e => updateNested('seo', 'description', e.target.value)} 
                placeholder="Explore the portfolio of..."
              />
            </div>
            
            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-medium mb-4">OpenGraph (LinkedIn, WhatsApp, etc)</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seo-og-title">OpenGraph Title</Label>
                  <Input 
                    id="seo-og-title"
                    value={settings?.seo?.openGraphTitle || ''} 
                    onChange={e => updateNested('seo', 'openGraphTitle', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo-og-desc">OpenGraph Description</Label>
                  <Textarea 
                    id="seo-og-desc"
                    rows={2} 
                    value={settings?.seo?.openGraphDescription || ''} 
                    onChange={e => updateNested('seo', 'openGraphDescription', e.target.value)} 
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-medium mb-4">Twitter Cards</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seo-tw-title">Twitter Title</Label>
                  <Input 
                    id="seo-tw-title"
                    value={settings?.seo?.twitterTitle || ''} 
                    onChange={e => updateNested('seo', 'twitterTitle', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo-tw-desc">Twitter Description</Label>
                  <Textarea 
                    id="seo-tw-desc"
                    rows={2} 
                    value={settings?.seo?.twitterDescription || ''} 
                    onChange={e => updateNested('seo', 'twitterDescription', e.target.value)} 
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
            </TabsContent>
          </Tabs>
        </fieldset>

        <div className="sticky bottom-0 bg-[#030712]/90 backdrop-blur-xl border-t border-white/[0.06] p-4 -mx-8 flex justify-end px-8 z-10">
          <Button 
            type="submit" 
            size="lg" 
            disabled={saving}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-8 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 disabled:opacity-50"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}
