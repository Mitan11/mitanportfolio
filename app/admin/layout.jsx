import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    redirect('/login');
  }

  return (
    <div className="dark h-screen w-full bg-[#030712] relative overflow-hidden flex text-slate-200 font-sans">
      
      {/* Premium Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[45%] h-[45%] rounded-full bg-blue-950/30 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-purple-950/25 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-indigo-950/15 blur-[120px] pointer-events-none" />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      {/* Client Sidebar with Active Links */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10 custom-scrollbar">
        <div className="p-8 max-w-6xl mx-auto min-h-full">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-black/20">
            {children}
          </div>
        </div>
      </main>

      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.15);
        }
      `}} />
    </div>
  );
}
