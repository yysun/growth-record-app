/**
 * 卡片视图组件
 * 
 * Features:
 * - 以卡片形式展示记录列表
 * - 按单元分组显示
 * - 支持图片展示
 * - 简洁统一的配色方案
 * 
 * Recent changes:
 * - 2025-11-28: 简化配色，统一使用灰色系+主题色
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, CalendarDays, Star, ChevronRight } from 'lucide-react';
import { SubjectUnit, SubjectItem } from '../types';

const RecordCard: React.FC<{ item: SubjectItem; onClick: () => void }> = ({ item, onClick }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300 group cursor-pointer"
      onClick={onClick}
    >
      {/* 图片区域 */}
      {item.image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}

      <div className="p-5">
        {/* 头部：标题和日期 */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors flex-1">
            {item.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 shrink-0 pt-1">
            <CalendarDays size={12} />
            <span>{item.date}</span>
          </div>
        </div>

        {/* 摘要 */}
        {item.summary && (
          <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
            {item.summary}
          </p>
        )}

        {/* 评分标签 */}
        {item.scoreLabel && (
          <div className="flex items-center gap-1.5 mb-3">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-amber-600">{item.scoreLabel}</span>
          </div>
        )}

        {/* 标签 */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 底部：查看详情 */}
        <div className="flex items-center justify-end pt-2 border-t border-gray-50">
          <div className="flex items-center text-emerald-500 text-sm font-medium group-hover:text-emerald-600 transition-colors">
            <span>查看详情</span>
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardView: React.FC<{ units: SubjectUnit[] }> = ({ units }) => {
  const navigate = useNavigate();
  const allItems = units.flatMap(u => u.items);

  return (
    <div className="px-4 py-2 space-y-6 pb-20">
      {units.map(unit => {
        if (unit.items.length === 0) return null;
        return (
          <div key={unit.id}>
            {/* 分组标题 */}
            <div className="flex items-center gap-2 px-1 mb-3">
              <h2 className="font-bold text-base text-gray-800">{unit.title}</h2>
              <span className="text-xs text-gray-400">{unit.items.length}条</span>
            </div>

            {/* 卡片列表 */}
            <div className="space-y-4">
              {unit.items.map(item => (
                <RecordCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate(`/record/${item.id}`)}
                />
              ))}
            </div>
          </div>
        )
      })}

      {/* 空状态 */}
      {allItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ClipboardCheck size={32} className="text-gray-300" />
          </div>
          <p className="text-gray-400 text-sm">暂无内容</p>
        </div>
      )}
    </div>
  )
}
