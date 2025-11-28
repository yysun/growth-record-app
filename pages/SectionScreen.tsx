/**
 * 板块详情页面组件
 * 
 * Features:
 * - 显示板块的所有分类和子分类
 * - 支持三种视图模式：结构视图、卡片视图、时间线视图
 * - 折叠/展开分类
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { Header } from '../components/Header';
import { Tabs } from '../components/Tabs';
import { BottomNav } from '../components/BottomNav';
import { CardView } from '../components/CardView';
import { TimelineView } from '../components/TimelineView';
import { CURRENT_USER, GROWTH_RECORDS, ALL_SECTIONS } from '../constants';
import { SubjectUnit, SubjectItem } from '../types';

export const SectionScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('structure');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Find section data
  const section = ALL_SECTIONS.find(s => s.id === id) || GROWTH_RECORDS;

  // Flatten all items for global views
  const allItems: SubjectItem[] = [];
  section.categories.forEach(cat => {
    if (cat.items) {
      allItems.push(...cat.items);
    }
    if (cat.subcategories) {
      cat.subcategories.forEach(sub => {
        allItems.push(...sub.items);
      });
    }
  });

  // Create pseudo units for compatibility with existing view components
  const viewUnits: SubjectUnit[] = section.categories.map(cat => {
    const items: SubjectItem[] = [];
    if (cat.items) items.push(...cat.items);
    if (cat.subcategories) {
      cat.subcategories.forEach(sub => items.push(...sub.items));
    }
    return {
      id: cat.id,
      title: cat.name,
      items
    };
  });

  const toggleCategory = (catId: string) => {
    setExpandedCategory(expandedCategory === catId ? null : catId);
  };

  const handleItemClick = (e: React.MouseEvent, item: SubjectItem) => {
    e.stopPropagation();
    navigate(`/record/${item.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header
        title={section.name}
        subtitle={`${CURRENT_USER.name} | ${CURRENT_USER.className}`}
        backTo="/"
      />

      <div className="sticky top-[72px] z-30 bg-gray-50 px-0">
        <Tabs
          options={[
            { id: 'structure', label: '结构视图' },
            { id: 'card', label: '卡片视图' },
            { id: 'timeline', label: '时间线' }
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="px-4 py-2 space-y-4">
        {/* Structure View (Accordion) */}
        {activeTab === 'structure' && section.categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all">
            <div
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
              onClick={() => toggleCategory(cat.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-sm">
                  <span className="text-emerald-600 font-bold">{cat.name.slice(0, 2)}</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{cat.name}</span>
              </div>
              {expandedCategory === cat.id ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </div>

            {expandedCategory === cat.id && (
              <div className="px-4 pb-4">
                <div className="pl-12 space-y-5">
                  {/* Direct items */}
                  {cat.items && cat.items.length > 0 && (
                    <ul className="space-y-3 relative border-l border-gray-100 ml-1.5 pl-4">
                      {cat.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center justify-between text-sm group cursor-pointer"
                          onClick={(e) => handleItemClick(e, item)}
                        >
                          <div className="flex items-center gap-2 text-gray-600">
                            <div className="absolute -left-[3px] w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-emerald-400 transition-colors"></div>
                            {item.title}
                          </div>
                          <ChevronRight size={14} className="text-gray-300" />
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Subcategories */}
                  {cat.subcategories && cat.subcategories.map((sub) => (
                    <div key={sub.id}>
                      <div className="font-bold text-gray-800 mb-2">{sub.name}</div>
                      <ul className="space-y-3 relative border-l border-gray-100 ml-1.5 pl-4">
                        {sub.items.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-center justify-between text-sm group cursor-pointer"
                            onClick={(e) => handleItemClick(e, item)}
                          >
                            <div className="flex items-center gap-2 text-gray-600">
                              <div className="absolute -left-[3px] w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-emerald-400 transition-colors"></div>
                              {item.title}
                            </div>
                            <ChevronRight size={14} className="text-gray-300" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {!cat.items?.length && !cat.subcategories?.length && (
                    <div className="text-sm text-gray-400">暂无数据</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Global Views */}
        {activeTab === 'card' && <CardView units={viewUnits} />}
        {activeTab === 'timeline' && <TimelineView units={viewUnits} />}
      </div>
      <BottomNav />
    </div>
  );
};
