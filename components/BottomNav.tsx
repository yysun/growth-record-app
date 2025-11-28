import React from 'react';
import { Home, MessageSquare, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 pb-6 px-8 flex justify-between items-center z-50">
      <button
        onClick={() => navigate('/')}
        className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-emerald-500' : 'text-gray-400'}`}
      >
        <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} />
        <span className="text-xs font-medium">首页</span>
      </button>

      <button
        onClick={() => navigate('/teacher-messages')}
        className={`flex flex-col items-center gap-1 ${location.pathname.startsWith('/teacher-message') ? 'text-emerald-500' : 'text-gray-400'}`}
      >
        <MessageSquare size={24} strokeWidth={location.pathname.startsWith('/teacher-message') ? 2.5 : 2} />
        <span className="text-xs font-medium">老师寄语</span>
      </button>

      <button
        onClick={() => navigate('/parent-messages')}
        className={`flex flex-col items-center gap-1 ${location.pathname.startsWith('/parent-message') ? 'text-emerald-500' : 'text-gray-400'}`}
      >
        <User size={24} strokeWidth={location.pathname.startsWith('/parent-message') ? 2.5 : 2} />
        <span className="text-xs font-medium">家长留言</span>
      </button>
    </div>
  );
};
