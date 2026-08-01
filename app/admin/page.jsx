import React from 'react';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Experience from '@/models/Experience';
import Skill from '@/models/Skill';
import Certification from '@/models/Certification';
import {
  IconBriefcase,
  IconTools,
  IconCertificate,
  IconCode,
  IconArrowRight
} from '@tabler/icons-react';

async function getStats() {
  await dbConnect();

  const [projects, experiences, skills, certifications] = await Promise.all([
    Project.countDocuments(),
    Experience.countDocuments(),
    Skill.countDocuments(),
    Certification.countDocuments(),
  ]);

  return { projects, experiences, skills, certifications };
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const greeting = getGreeting();

  const statCards = [
    { title: 'Total Projects', value: stats.projects, icon: <IconBriefcase size={22} />, gradient: 'from-blue-500 to-blue-600', glow: 'shadow-blue-500/20', bg: 'bg-blue-500/10', text: 'text-blue-400' },
    { title: 'Experience Roles', value: stats.experiences, icon: <IconTools size={22} />, gradient: 'from-emerald-500 to-emerald-600', glow: 'shadow-emerald-500/20', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
    { title: 'Skill Categories', value: stats.skills, icon: <IconCode size={22} />, gradient: 'from-purple-500 to-purple-600', glow: 'shadow-purple-500/20', bg: 'bg-purple-500/10', text: 'text-purple-400' },
    { title: 'Certifications', value: stats.certifications, icon: <IconCertificate size={22} />, gradient: 'from-amber-500 to-amber-600', glow: 'shadow-amber-500/20', bg: 'bg-amber-500/10', text: 'text-amber-400' },
  ];

  const quickActions = [
    { name: 'Projects', description: 'Add or manage your portfolio projects', href: '/admin/projects', icon: <IconBriefcase size={20} />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { name: 'Experience', description: 'Edit work experience entries', href: '/admin/experience', icon: <IconTools size={20} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { name: 'Skills', description: 'Update your skill categories', href: '/admin/skills', icon: <IconCode size={20} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { name: 'Certifications', description: 'Manage your certificates', href: '/admin/certifications', icon: <IconCertificate size={20} />, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">
          {greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Admin</span>
        </h1>
        <p className="text-slate-500 text-sm">Here&apos;s a quick overview of your portfolio content.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <div key={idx} className={`group relative bg-slate-900/60 border border-white/[0.06] rounded-xl p-5 flex items-center justify-between hover:border-white/10 transition-all duration-300 hover:shadow-lg ${card.glow}`}>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-white tracking-tight">{card.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${card.bg} ring-1 ring-white/[0.05]`}>
              <span className={card.text}>{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickActions.map((action, idx) => (
            <Link 
              key={idx} 
              href={action.href}
              className="group flex items-center gap-4 p-4 bg-slate-900/40 border border-white/[0.05] rounded-xl hover:bg-slate-900/60 hover:border-white/[0.08] transition-all duration-200"
            >
              <div className={`p-2.5 rounded-lg ${action.bg} ring-1 ring-white/[0.05]`}>
                <span className={action.color}>{action.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{action.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{action.description}</p>
              </div>
              <IconArrowRight size={16} className="text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all duration-200" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
