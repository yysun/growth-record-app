/**
 * 记录详情页面组件
 * 
 * Features:
 * - 显示记录的详细信息
 * - 支持显示照片
 * - 家长点评列表
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronUp, ArrowRight } from 'lucide-react';
import { Header } from '../components/Header';
import { CURRENT_USER } from '../constants';
import { SubjectItem } from '../types';

export const RecordDetailScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find record - mock implementation
  const record: SubjectItem = {
    id: id || 'lang-1',
    title: '故事讲述活动',
    type: 'activity',
    date: '11-25',
    summary: '能够完整讲述《小红帽》故事，表达清晰，情感丰富。',
    tags: ['表达清晰', '有进步'],
    scoreLabel: '表现优秀',
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <Header title={record.title} backTo="/" />

      {/* Meta Info */}
      <div className="bg-white p-5 mb-3 border-b border-gray-100">
        <div className="grid grid-cols-1 gap-y-2 text-sm">
          <div className="flex"><span className="text-gray-500 w-20">幼儿姓名</span> <span className="text-gray-900 font-medium">{CURRENT_USER.name}</span></div>
          <div className="flex"><span className="text-gray-500 w-20">班级</span> <span className="text-gray-900 font-medium">{CURRENT_USER.className}</span></div>
          <div className="flex"><span className="text-gray-500 w-20">日期</span> <span className="text-gray-900 font-medium">{record.date}</span></div>
          {record.scoreLabel && <div className="flex"><span className="text-gray-500 w-20">评价</span> <span className="text-emerald-600 font-medium">{record.scoreLabel}</span></div>}
        </div>
      </div>

      {/* Record Content */}
      <div className="bg-white p-5 mb-3 border-y border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900 text-lg">记录内容</h3>
          <ChevronUp size={20} className="text-gray-400" />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {record.summary}
        </p>
        {record.tags && record.tags.length > 0 && (
          <div className="flex gap-2 mt-4">
            {record.tags.map(tag => (
              <span key={tag} className="bg-emerald-50 text-emerald-600 text-xs px-3 py-1 rounded-full font-medium">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Photos */}
      {record.image && (
        <div className="bg-white p-5 mb-3 border-y border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">相关照片</h3>
          <div className="grid grid-cols-2 gap-4">
            <img src={record.image} alt="记录照片" className="w-full aspect-square object-cover rounded-xl" />
          </div>
        </div>
      )}

      {/* Parent Feedback List */}
      <div className="bg-white p-5 border-t border-gray-100">
        <h3 className="font-bold text-gray-900 mb-6 text-lg">家长点评</h3>

        {/* Comment 1 */}
        <div className="flex gap-4 mb-8">
          <img src="https://i.pravatar.cc/100?img=5" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-gray-900">妈妈</span>
              <span className="text-xs text-gray-400">2023年10月27日 09:15</span>
            </div>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">老师您好，谢谢您的反馈。我们会多陪孩子练习这方面的题目。</p>
            <div className="bg-emerald-50 inline-block px-3 py-1 rounded-full">
              <span className="text-emerald-600 text-xs font-medium">老师已回复</span>
            </div>
          </div>
        </div>

        {/* Comment 2 */}
        <div className="flex gap-4">
          <img src="https://i.pravatar.cc/100?img=11" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-gray-900">爸爸</span>
              <span className="text-xs text-gray-400">2023年10月26日 21:40</span>
            </div>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">孩子这次做得不错，有进步，继续加油！</p>
            <div className="flex items-center justify-between">
              <div className="bg-gray-100 inline-block px-3 py-1 rounded-full">
                <span className="text-gray-500 text-xs font-medium">待老师回复</span>
              </div>
              <div className="flex gap-3">
                <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100">
                  <ArrowRight size={14} className="text-gray-400 rotate-180" />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100">
                  <ArrowRight size={14} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 px-6 flex gap-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
        <button
          onClick={() => navigate('/add-comment')}
          className="flex-1 bg-emerald-400 text-white font-bold py-3.5 rounded-full hover:bg-emerald-500 transition shadow-lg shadow-emerald-100 text-sm"
        >
          写点评
        </button>
        <button
          onClick={() => navigate(-1)}
          className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-full hover:bg-gray-50 transition text-sm"
        >
          返回列表
        </button>
      </div>
    </div>
  );
};
