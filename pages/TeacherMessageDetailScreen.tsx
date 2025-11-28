/**
 * 老师寄语详情页面组件
 * 
 * Features:
 * - 显示老师寄语的完整内容
 * - 显示老师信息和日期
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { TEACHER_MESSAGES } from '../constants';

export const TeacherMessageDetailScreen: React.FC = () => {
  const { id } = useParams();
  const message = TEACHER_MESSAGES.find(m => m.id === id) || TEACHER_MESSAGES[0];

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Header title={message.title} backTo="/teacher-messages" />

      <div className="m-4 bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={message.teacherFeedback?.avatar}
            className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
            alt="Teacher"
          />
          <div>
            <div className="font-bold text-gray-900 text-lg">{message.teacherFeedback?.name}</div>
            <div className="text-xs text-gray-400 mt-1">{message.teacherFeedback?.date}</div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed text-justify text-base whitespace-pre-wrap">
          {message.teacherFeedback?.content}
        </p>

        {message.tags && message.tags.length > 0 && (
          <div className="flex gap-2 mt-6">
            {message.tags.map(tag => (
              <span key={tag} className="bg-purple-50 text-purple-600 text-xs px-3 py-1 rounded-full font-medium">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
