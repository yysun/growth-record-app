import React from 'react';

interface TabOption {
  id: string;
  label: string;
}

interface TabsProps {
  options: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ options, activeId, onChange }) => {
  return (
    <div className="px-4 py-3 bg-gray-50">
      <div className="flex bg-gray-200/50 rounded-xl p-1 shadow-inner">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeId === option.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};