import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, backTo }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-40">
      <button 
        onClick={() => backTo ? navigate(backTo) : navigate(-1)}
        className="p-2 -ml-2 text-gray-800 hover:bg-gray-50 rounded-full"
      >
        <ChevronLeft size={28} />
      </button>
      <div className="flex-1 text-center pr-10">
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
};
