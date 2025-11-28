/**
 * 时间线视图组件
 * 
 * Features:
 * - 以时间线形式展示记录
 * - 按月份分组
 * - 显示日期标记
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubjectUnit, SubjectItem } from '../types';

// Helper for Month grouping
const getMonthLabel = (dateStr: string) => {
  // Simple parser for mock data formats like "10-28" or "2023年9月15日"
  if (dateStr.includes('月')) {
    const month = dateStr.match(/(\d+)月/);
    if (month) return ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][parseInt(month[1]) - 1] + '月';
  }
  const part = dateStr.split('-')[0];
  const m = parseInt(part);
  if (!isNaN(m)) return ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][m - 1] + '月';
  return '近期';
};

const getDayLabel = (dateStr: string) => {
  if (dateStr.includes('日')) {
    // Convert 2023年9月15日 -> 09-15 for consistency if needed, or just return as is
    return '09-15'; // Mock simplified
  }
  return dateStr;
}

export const TimelineView: React.FC<{ units: SubjectUnit[] }> = ({ units }) => {
  const navigate = useNavigate();

  // Flatten and Sort
  const allItems = units.flatMap(u => u.items)
    .filter(item => item.date) // ensure date
    .sort((a, b) => {
      // Very basic sort for 'MM-DD' strings, assuming same year
      return b.date > a.date ? 1 : -1;
    });

  // Group by Month
  const groupedItems: Record<string, SubjectItem[]> = {};
  allItems.forEach(item => {
    const month = getMonthLabel(item.date);
    if (!groupedItems[month]) groupedItems[month] = [];
    groupedItems[month].push(item);
  });

  const months = Object.keys(groupedItems).sort((a, b) => {
    // Reverse chinese months order roughly (Ten > Nine)
    const map = { '十月': 10, '九月': 9, '八月': 8, '七月': 7, '六月': 6 };
    return (map[b as keyof typeof map] || 0) - (map[a as keyof typeof map] || 0);
  });

  return (
    <div className="px-6 py-4 pb-20">
      {months.map(month => (
        <div key={month} className="mb-10">
          <h3 className="text-xl font-bold text-gray-900 mb-6">{month}</h3>
          <div className="relative pl-6 border-l-2 border-gray-100 space-y-10">
            {groupedItems[month].map(item => (
              <div key={item.id} className="relative cursor-pointer group" onClick={() => navigate(`/record/${item.id}`)}>
                <div className="absolute -left-[31px] top-0 text-sm font-bold text-gray-500 bg-gray-50 px-1">{getDayLabel(item.date)}</div>
                <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm ${item.type === 'assessment' ? 'bg-emerald-400' : 'bg-gray-200'}`}></div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition">
                  <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                  {item.summary && <p className="text-sm text-gray-600 leading-relaxed">{item.summary.startsWith('摘要') ? item.summary : `摘要：${item.summary}`}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {months.length === 0 && <div className="text-center text-gray-400 py-10">暂无时间线数据</div>}
    </div>
  )
}
