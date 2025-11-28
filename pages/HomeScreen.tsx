/**
 * 首页组件
 * 
 * Features:
 * - 用户信息展示
 * - 主要板块导航卡片
 * - 学期进度显示
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ThumbsUp, PartyPopper, FileText, ChevronDown } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { CURRENT_USER } from '../constants';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      icon: <BookOpen />,
      title: '成长记录',
      subtitle: '语言·社交·创作·活动',
      stat: '18',
      statLabel: '本学期记录',
      color: 'text-emerald-500',
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      iconBg: 'bg-emerald-100',
      link: '/section/growth-records'
    },
    {
      icon: <ThumbsUp />,
      title: '英语课程档案',
      subtitle: '听力·口语·单词·故事',
      stat: '9',
      statLabel: '课程记录',
      color: 'text-blue-500',
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconBg: 'bg-blue-100',
      link: '/section/english-course'
    },
    {
      icon: <PartyPopper />,
      title: '幼小衔接档案',
      subtitle: '数学·阅读·学习习惯',
      stat: '7',
      statLabel: '衔接记录',
      color: 'text-orange-500',
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconBg: 'bg-orange-100',
      link: '/section/transition-course'
    },
    {
      icon: <FileText />,
      title: '老师寄语',
      subtitle: '老师的鼓励与建议',
      stat: '2',
      statLabel: '条寄语',
      color: 'text-purple-500',
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconBg: 'bg-purple-100',
      link: '/teacher-messages'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header Profile */}
      <div className="px-5 pt-12 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={CURRENT_USER.avatar} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover" />
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-lg font-bold text-gray-900">{CURRENT_USER.name}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
            <span className="text-xs text-gray-400">{CURRENT_USER.className}</span>
          </div>
        </div>
        <div className="bg-white shadow-sm text-gray-600 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:shadow-md transition border border-gray-100">
          <span>2024-2025 上</span>
          <ChevronDown size={12} className="text-gray-400" />
        </div>
      </div>

      {/* Title Section */}
      <div className="px-5 pb-5">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">成长档案</h1>
        <p className="text-sm text-gray-400">记录每一步成长</p>
      </div>

      {/* Grid Cards */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => navigate(card.link)}
            className={`${card.bg} p-4 rounded-2xl shadow-sm border border-white/50 flex flex-col hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer`}
          >
            <div className={`w-10 h-10 ${card.iconBg} rounded-xl flex items-center justify-center mb-3 shadow-sm`}>
              {React.cloneElement(card.icon as React.ReactElement, { size: 20, className: card.color })}
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-0.5">{card.title}</h3>
            <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">{card.subtitle}</p>
            <div className="mt-auto pt-2 border-t border-white/60">
              <span className={`text-lg font-bold ${card.color}`}>{card.stat}</span>
              <span className="text-[10px] text-gray-400 ml-1">{card.statLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mx-4 mt-5 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span className="text-sm font-medium text-gray-700">本学期进度</span>
          </div>
          <span className="text-xs text-gray-400">第 14 周 / 共 20 周</span>
        </div>
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-[70%] bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"></div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
