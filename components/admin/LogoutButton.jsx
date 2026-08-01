"use client";

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { IconLogout } from '@tabler/icons-react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-xl text-red-400/80 hover:text-red-300 hover:bg-red-950/20 transition-all duration-200"
    >
      <IconLogout size={16} />
      Sign Out
    </button>
  );
}
