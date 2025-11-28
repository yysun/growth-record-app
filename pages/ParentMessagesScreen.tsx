/**
 * 家长留言列表页面组件
 * 
 * Features:
 * - 显示所有家长留言
 * - 支持添加新留言
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { CURRENT_USER, PARENT_MESSAGES } from '../constants';

export const ParentMessagesScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="家长留言" subtitle={`${CURRENT_USER.name} | ${CURRENT_USER.className}`} backTo="/" />

      <div className="px-4 py-4 space-y-4">
        {PARENT_MESSAGES.map((message) => (
          <div
            key={message.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-gray-900">{message.title}</h3>
              <span className="text-xs text-gray-400">{message.date}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              {message.summary}
            </p>
            {message.image && (
              <img src={message.image} alt="照片" className="w-full aspect-video object-cover rounded-xl mb-3" />
            )}
            {message.tags && message.tags.length > 0 && (
              <div className="flex gap-2">
                {message.tags.map(tag => (
                  <span key={tag} className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-20 right-6 z-50">
        <button
          onClick={() => navigate('/add-comment')}
          className="w-14 h-14 rounded-full bg-emerald-400 text-white flex items-center justify-center hover:bg-emerald-500 shadow-lg shadow-emerald-200 transition"
        >
          <Pencil size={24} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
};
