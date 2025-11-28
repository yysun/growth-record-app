/**
 * 卡片视图组件
 * 
 * Features:
 * - 以卡片形式展示记录列表
 * - 按单元分组显示
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubjectUnit } from '../types';

export const CardView: React.FC<{ units: SubjectUnit[] }> = ({ units }) => {
  const navigate = useNavigate();
  const allItems = units.flatMap(u => u.items);

  return (
    <div className="px-4 py-2 space-y-6 pb-20">
      {units.map(unit => {
        if (unit.items.length === 0) return null;
        return (
          <div key={unit.id}>
            <div className="font-bold text-lg text-gray-900 px-1 mb-3">{unit.title}</div>
            <div className="space-y-4">
              {unit.items.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                  </div>
                  <div className="text-xs text-gray-400 mb-3">{item.date}</div>
                  {item.summary && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {item.summary}
                    </p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {item.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full font-medium">{tag}</span>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => navigate(`/record/${item.id}`)}
                    className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-3 rounded-full text-sm transition-colors shadow-lg shadow-emerald-100"
                  >
                    查看详情
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      })}
      {allItems.length === 0 && <div className="text-center text-gray-400 py-10">暂无内容</div>}
    </div>
  )
}
