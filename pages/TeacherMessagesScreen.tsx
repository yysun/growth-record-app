/**
 * 老师寄语列表页面组件
 * 
 * Features:
 * - 显示所有老师寄语
 * - 点击查看详情
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { CURRENT_USER, TEACHER_MESSAGES } from '../constants';

export const TeacherMessagesScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="老师寄语" subtitle={`${CURRENT_USER.name} | ${CURRENT_USER.className}`} backTo="/" />

      <div className="px-4 py-4 space-y-4">
        {TEACHER_MESSAGES.map((message) => (
          <div
            key={message.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 cursor-pointer hover:shadow-md transition"
            onClick={() => navigate(`/teacher-message/${message.id}`)}
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={message.teacherFeedback?.avatar}
                alt="Teacher"
                className="w-10 h-10 rounded-full border border-gray-100"
              />
              <div className="flex-1">
                <div className="font-bold text-gray-900">{message.teacherFeedback?.name}</div>
                <div className="text-xs text-gray-400">{message.date}</div>
              </div>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{message.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {message.summary}
            </p>
            {message.tags && message.tags.length > 0 && (
              <div className="flex gap-2 mt-3">
                {message.tags.map(tag => (
                  <span key={tag} className="bg-purple-50 text-purple-600 text-xs px-2.5 py-1 rounded-full font-medium">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};
