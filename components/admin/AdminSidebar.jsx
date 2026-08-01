"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  IconLayoutDashboard, 
  IconBriefcase, 
  IconBulb, 
  IconTools, 
  IconCertificate, 
  IconSettings,
  IconHome,
  IconCode,
  IconDatabase
} from '@tabler/icons-react';
import LogoutButton from '@/components/admin/LogoutButton';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: IconLayoutDashboard },
  { name: 'General Settings', href: '/admin/settings', icon: IconSettings },
  { name: 'Projects', href: '/admin/projects', icon: IconBriefcase },
  { name: 'Experience', href: '/admin/experience', icon: IconTools },
  { name: 'Expertise', href: '/admin/expertise', icon: IconBulb },
  { name: 'Skills', href: '/admin/skills', icon: IconCode },
  { name: 'Certifications', href: '/admin/certifications', icon: IconCertificate },
  { name: 'Backup & Restore', href: '/admin/backup', icon: IconDatabase },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-72 bg-black/40 backdrop-blur-xl border-r border-white/[0.06] flex flex-col h-screen z-20 shadow-2xl shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-full h-full object-cover" src="/favicon.ico" width={36} height={36} alt="logo" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              Admin Portal
            </h2>
            <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">Portfolio Manager</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-[0.15em] mb-3 px-3">Content</div>
        {navItems.slice(0, 2).map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden ${
                active 
                  ? 'bg-gradient-to-r from-blue-500/15 to-purple-500/10 text-white shadow-sm shadow-blue-500/5' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-gradient-to-b from-blue-400 to-purple-500" />
              )}
              <Icon 
                size={18} 
                className={`transition-colors duration-200 ${active ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`}
              />
              <span className="relative">{item.name}</span>
            </Link>
          );
        })}
        
        <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-[0.15em] mt-6 mb-3 px-3">Manage</div>
        {navItems.slice(2).map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden ${
                active 
                  ? 'bg-gradient-to-r from-blue-500/15 to-purple-500/10 text-white shadow-sm shadow-blue-500/5' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-gradient-to-b from-blue-400 to-purple-500" />
              )}
              <Icon 
                size={18} 
                className={`transition-colors duration-200 ${active ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`}
              />
              <span className="relative">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/[0.06] space-y-2 bg-black/30 shrink-0">
        <Link 
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium rounded-xl text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all duration-200 hover:border-white/10"
        >
          <IconHome size={16} />
          Live Portfolio
        </Link>
        <LogoutButton />
      </div>
    </aside>
  );
}
