import React, { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import {
    BookOpen,
    ThumbsUp,
    PartyPopper,
    FileText,
    ChevronDown,
    ChevronRight,
    ChevronUp,
    FileQuestion,
    Pencil,
    Play,
    ArrowRight,
    Image as ImageIcon,
    X,
    File
} from 'lucide-react';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { CURRENT_USER, CHINESE_SUBJECT, MATH_SUBJECT, ENGLISH_SUBJECT } from './constants';
import { SubjectUnit, SubjectItem } from './types';

// --- Helper for Month grouping ---
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

// --- Shared View Components ---

const StructureView: React.FC<{ units: SubjectUnit[] }> = ({ units }) => {
    const navigate = useNavigate();
    return (
        <div className="px-6 py-4 relative min-h-[500px]">
            {/* Main vertical line */}
            <div className="absolute left-[29px] top-6 bottom-0 w-[2px] bg-gray-200"></div>

            {/* Top Node: Start of Semester */}
            <div className="flex items-center gap-3 mb-8 relative">
                <div className="z-10 w-4 h-4 rounded-full bg-white border-4 border-gray-300 shadow-sm relative left-[-1px]"></div>
                <span className="text-sm text-gray-400 font-medium">上册</span>
            </div>

            {units.filter(u => u.items.length > 0 && u.title !== '其他').map((unit) => (
                <div key={unit.id} className="mb-10 relative">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="z-10 w-4 h-4 rounded-full bg-white border-4 border-emerald-400 shadow-sm relative left-[-1px]"></div>
                        <span className="font-bold text-base text-emerald-800 bg-emerald-100 px-3 py-1 rounded-md">{unit.title.split('：')[0]}</span>
                    </div>

                    <div className="pl-8 space-y-3">
                        {unit.items.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => item.type === 'feedback' ? navigate(`/teacher-feedback/${item.id}`) : navigate(`/task/${item.id}`)}
                                className="flex items-center justify-between group cursor-pointer bg-white border border-gray-100 hover:border-emerald-200 p-3 rounded-xl shadow-sm transition"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.type === 'assignment' ? 'bg-emerald-50 text-emerald-500' : 'bg-green-50 text-green-600'}`}>
                                        {item.type === 'assignment' ? <Pencil size={20} /> : <FileQuestion size={20} />}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800 text-sm">{item.title}</div>
                                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                            {item.scoreLabel && <span className="text-emerald-600 font-medium">{item.scoreLabel}</span>}
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-gray-300" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className="flex items-center gap-3 mb-4 relative">
                <div className="z-10 w-4 h-4 rounded-full bg-white border-4 border-gray-300 shadow-sm relative left-[-1px]"></div>
                <span className="text-sm text-gray-400 font-medium">下册</span>
            </div>
        </div>
    )
}

const CardView: React.FC<{ units: SubjectUnit[] }> = ({ units }) => {
    const navigate = useNavigate();
    const allItems = units.flatMap(u => u.items);

    // Group by Unit Title roughly to simulate sections if needed, or just list
    // For this implementation, we'll try to group by the unit they belong to.

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
                                        onClick={() => item.type === 'feedback' ? navigate(`/teacher-feedback/${item.id}`) : navigate(`/task/${item.id}`)}
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

const TimelineView: React.FC<{ units: SubjectUnit[] }> = ({ units }) => {
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
                            <div key={item.id} className="relative cursor-pointer group" onClick={() => navigate(`/task/${item.id}`)}>
                                <div className="absolute -left-[31px] top-0 text-sm font-bold text-gray-500 bg-gray-50 px-1">{getDayLabel(item.date)}</div>
                                <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm ${item.type === 'exam' ? 'bg-emerald-400' : 'bg-gray-200'}`}></div>
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

// --- Screen 1: Home Dashboard ---
const HomeScreen: React.FC = () => {
    const navigate = useNavigate();

    const cards = [
        { icon: <BookOpen className="text-orange-500" />, title: '学科表现', subtitle: '查看各科成绩与能力', color: 'text-orange-500', bg: 'bg-orange-50', link: '/subjects' },
        { icon: <ThumbsUp className="text-emerald-500" />, title: '日常表现', subtitle: '了解在校行为与习惯', color: 'text-emerald-500', bg: 'bg-emerald-50', link: '#' },
        { icon: <PartyPopper className="text-purple-500" />, title: '主题活动', subtitle: '回顾精彩的活动瞬间', color: 'text-purple-500', bg: 'bg-purple-50', link: '#' },
        { icon: <FileText className="text-blue-500" />, title: '班级评语', subtitle: '阅读老师的综合评价', color: 'text-blue-500', bg: 'bg-blue-50', link: '#' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Profile */}
            <div className="px-6 pt-12 pb-6 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-3">
                    <img src={CURRENT_USER.avatar} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover" />
                    <div className="flex items-center gap-1 cursor-pointer">
                        <span className="text-xl font-bold text-gray-900">{CURRENT_USER.name}</span>
                        <ChevronDown size={20} className="text-gray-500" />
                    </div>
                </div>
                <div className="bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-emerald-200 transition">
                    <span>2023-2024 上</span>
                    <div className="flex flex-col gap-0">
                        <ChevronDown size={12} />
                    </div>
                </div>
            </div>

            <div className="px-6 pb-4">
                <h1 className="text-3xl font-extrabold text-gray-900">成长档案</h1>
            </div>

            {/* Grid Cards */}
            <div className="px-4 grid grid-cols-2 gap-4">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate(card.link)}
                        className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 hover:shadow-md transition-shadow cursor-pointer aspect-square justify-between"
                    >
                        <div className={`p-3 rounded-xl ${card.bg}`}>
                            {card.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
                            <p className="text-sm text-gray-400 mt-1 leading-tight">{card.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-8 text-gray-400 text-sm">
                点击卡片查看详情
            </div>
            <BottomNav />
        </div>
    );
};

// --- Screen 2: Subject List Overview ---
const SubjectListScreen: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('structure');
    const [expandedSubject, setExpandedSubject] = useState<string | null>('chinese');

    const subjects = [CHINESE_SUBJECT, MATH_SUBJECT, ENGLISH_SUBJECT];
    // Aggregate units for Global Views
    const allUnits = subjects.flatMap(s => s.units);

    const subjectIcons: Record<string, any> = {
        'chinese': <span className="font-serif font-bold text-blue-500">文</span>,
        'math': <span className="font-mono font-bold text-emerald-500">1+1</span>,
        'english': <span className="font-sans font-bold text-orange-500">Aa</span>
    };
    const subjectBg: Record<string, string> = {
        'chinese': 'bg-blue-100',
        'math': 'bg-emerald-100',
        'english': 'bg-orange-100'
    };

    const toggleSubject = (id: string) => {
        setExpandedSubject(expandedSubject === id ? null : id);
    };

    const handleItemClick = (e: React.MouseEvent, item: SubjectItem) => {
        e.stopPropagation();
        if (item.type === 'feedback') {
            navigate(`/teacher-feedback/${item.id}`);
        } else {
            navigate(`/task/${item.id}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header title="学科表现（本学期）" subtitle="张三 | 三年级 (2) 班" backTo="/" />

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
                {activeTab === 'structure' && subjects.map((sub) => (
                    <div key={sub.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all">
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
                            onClick={() => toggleSubject(sub.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full ${subjectBg[sub.id]} flex items-center justify-center text-sm`}>
                                    {subjectIcons[sub.id]}
                                </div>
                                <span className="text-lg font-bold text-gray-900">{sub.name}</span>
                            </div>
                            {expandedSubject === sub.id ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                        </div>

                        {expandedSubject === sub.id && (
                            <div className="px-4 pb-4">
                                <div className="pl-12 space-y-5">
                                    {sub.units.length > 0 ? sub.units.filter(u => u.title !== '其他').map((unit) => (
                                        <div key={unit.id}>
                                            <div className="font-bold text-gray-800 mb-2">{unit.title}</div>
                                            <ul className="space-y-3 relative border-l border-gray-100 ml-1.5 pl-4">
                                                {unit.items.map((item) => (
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
                                    )) : (
                                        <div className="text-sm text-gray-400">暂无数据</div>
                                    )}

                                    <button
                                        onClick={() => navigate(`/subject/${sub.id}`)}
                                        className="w-full mt-2 py-3 text-sm text-center text-gray-400 hover:text-emerald-500 transition-colors border-t border-gray-50"
                                    >
                                        点击卡片查看详情
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Global Views */}
                {activeTab === 'card' && <CardView units={allUnits} />}
                {activeTab === 'timeline' && <TimelineView units={allUnits} />}
            </div>
            <BottomNav />
        </div>
    );
};

// --- Screen 3, 4, 5: Subject Detail Wrapper ---
const SubjectDetailScreen: React.FC = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('card');

    // Find subject data dynamically
    const subject = [CHINESE_SUBJECT, MATH_SUBJECT, ENGLISH_SUBJECT].find(s => s.id === id) || CHINESE_SUBJECT;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header title={subject.name} backTo="/subjects" />
            <div className="sticky top-[72px] z-30 bg-gray-50 pt-2">
                <Tabs
                    options={[
                        { id: 'structure', label: '结构视图' },
                        { id: 'card', label: '卡片视图' },
                        { id: 'timeline', label: '时间线' }
                    ]}
                    activeId={activeTab}
                    onChange={setActiveTab}
                />
                {/* Secondary Info Bar shown in Screenshot 4/5 */}
                <div className="flex justify-between px-8 py-3 text-sm text-gray-500 bg-gray-50 border-b border-gray-100">
                    {activeTab === 'card' ? (
                        <>
                            <span className="text-emerald-600 font-bold border-b-2 border-emerald-500 pb-1 -mb-3.5 z-10">关联节点</span>
                            <span className="pb-1">关联科目</span>
                        </>
                    ) : activeTab === 'timeline' ? (
                        <>
                            <span className="text-emerald-600 font-bold border-b-2 border-emerald-500 pb-1 -mb-3.5 z-10">所有科目</span>
                            <span className="pb-1">所有类型</span>
                        </>
                    ) : (
                        // Structure view specific or empty
                        <div className="h-0"></div>
                    )}
                </div>
            </div>

            <div className="pb-0">
                {activeTab === 'structure' && <StructureView units={subject.units} />}
                {activeTab === 'card' && <CardView units={subject.units} />}
                {activeTab === 'timeline' && <TimelineView units={subject.units} />}
            </div>
        </div>
    );
};

// --- Screen 6, 7: Task Details ---
const TaskDetailScreen: React.FC = () => {
    const navigate = useNavigate();
    // In a real app, use useParams() to fetch data. Here we mock "Reading Comprehension A" style content
    // but ensure linking works.

    return (
        <div className="min-h-screen bg-gray-50 pb-28">
            <Header title="阅读理解 A" backTo="/subject/chinese" />

            {/* Meta Info */}
            <div className="bg-white p-5 mb-3 border-b border-gray-100">
                <div className="grid grid-cols-1 gap-y-2 text-sm">
                    <div className="flex"><span className="text-gray-500 w-20">学生姓名</span> <span className="text-gray-900 font-medium">李小明</span></div>
                    <div className="flex"><span className="text-gray-500 w-20">班级</span> <span className="text-gray-900 font-medium">三年级二班</span></div>
                    <div className="flex"><span className="text-gray-500 w-20">科目</span> <span className="text-gray-900 font-medium">语文</span></div>
                </div>
            </div>

            {/* Task Section */}
            <div className="bg-white p-5 mb-3 border-y border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">本次任务</h3>
                    <ChevronUp size={20} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                    本次任务的目标是学习如何识别文章中的主要观点和支撑细节。学生需要阅读一篇短文，并回答相关问题，以展示他们的理解能力。
                </p>
            </div>

            <div className="bg-white p-5 mb-3 border-y border-gray-100">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 text-lg">本次表现</h3>
                    <ChevronDown size={20} className="text-gray-400" />
                </div>
            </div>

            {/* Photos */}
            <div className="bg-white p-5 mb-3 border-y border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">作业照片</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-[3/4] bg-orange-100 rounded-xl overflow-hidden relative shadow-inner p-3">
                        <div className="h-full w-full bg-white shadow-sm flex flex-col p-3 rounded-sm">
                            <div className="h-full w-full border-l border-red-200 flex flex-col gap-3">
                                <div className="h-1 bg-gray-200 w-3/4 rounded mt-4"></div>
                                <div className="h-1 bg-gray-200 w-full rounded"></div>
                                <div className="h-1 bg-gray-200 w-5/6 rounded"></div>
                                <div className="h-1 bg-gray-200 w-full rounded mt-4"></div>
                            </div>
                        </div>
                    </div>
                    <div className="aspect-[3/4] bg-yellow-50 rounded-xl overflow-hidden relative shadow-inner flex items-center justify-center p-4">
                        <div className="w-full h-full bg-white shadow-sm p-3 rounded-sm flex flex-col gap-2">
                            <div className="h-1 bg-gray-200 w-full rounded mt-2"></div>
                            <div className="h-1 bg-gray-200 w-2/3 rounded"></div>
                        </div>
                    </div>
                    <div className="col-span-1 aspect-square bg-gray-100 rounded-xl overflow-hidden relative flex items-center justify-center">
                        <div className="w-20 h-28 bg-white shadow-sm rotate-6"></div>
                        <div className="absolute bottom-2 left-4 w-2 h-20 bg-black rounded-full shadow-xl -rotate-12 opacity-80"></div>
                    </div>
                </div>
            </div>

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
                    onClick={() => navigate('/subject/chinese')}
                    className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-full hover:bg-gray-50 transition text-sm"
                >
                    查看本单元其他记录
                </button>
            </div>
        </div>
    )
}

// --- Screen 8: Add Comment ---
const AddCommentScreen: React.FC = () => {
    const navigate = useNavigate();
    const [text, setText] = useState('');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header title="写点评" backTo={undefined} />

            {/* Linked Context */}
            <div className="bg-white mt-4 mx-4 rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-center border-b border-gray-50 pb-3 mb-3">
                    <span className="text-emerald-500 font-bold text-sm">关联节点</span>
                    <span className="text-gray-500 text-sm">第一学期总结</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-emerald-500 font-bold text-sm">关联科目</span>
                    <span className="text-gray-500 text-sm">数学</span>
                </div>
            </div>

            {/* Input Area */}
            <div className="bg-white mt-4 mx-4 rounded-2xl p-5 shadow-sm flex-1 mb-24 flex flex-col">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">点评内容</h3>
                <textarea
                    className="w-full flex-1 resize-none outline-none text-gray-700 placeholder-gray-300 text-base leading-relaxed"
                    placeholder="请输入您对孩子本次表现的点评，分享您的鼓励和建议。"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="text-right text-xs text-gray-400 mt-2">0/500</div>
            </div>

            {/* Photo Attachment Section */}
            <div className="px-6 mb-28">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">添加照片</h3>
                <div className="flex gap-4">
                    {/* Mock existing photo */}
                    <div className="relative w-24 h-24 bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
                        <div className="w-full h-full bg-yellow-50 rounded-lg overflow-hidden relative">
                            <div className="absolute top-2 left-2 w-6 h-6 rounded-full border border-yellow-400 bg-yellow-100"></div>
                            <div className="absolute bottom-0 w-full h-8 bg-blue-100"></div>
                        </div>
                        <button className="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full p-1 border-2 border-white">
                            <X size={10} />
                        </button>
                    </div>
                    {/* Mock existing photo 2 */}
                    <div className="relative w-24 h-24 bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
                        <div className="w-full h-full bg-orange-50 rounded-lg overflow-hidden flex items-center justify-center">
                            <img src="https://picsum.photos/id/20/200/200" className="object-cover w-full h-full opacity-90" />
                        </div>
                        <button className="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full p-1 border-2 border-white">
                            <X size={10} />
                        </button>
                    </div>

                    {/* Add Button */}
                    <button className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-blue-400 bg-gray-50 hover:bg-blue-50 transition gap-1">
                        <ImageIcon size={24} />
                        <span className="text-[10px] font-bold">上传</span>
                    </button>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 px-6 border-t border-gray-100">
                <button
                    onClick={() => navigate(-1)}
                    className="w-full bg-emerald-400 text-white font-bold py-3.5 rounded-full hover:bg-emerald-500 transition shadow-lg shadow-emerald-100 text-sm"
                >
                    提交
                </button>
            </div>
        </div>
    )
}

// --- Screen 9: Teacher Feedback Detail ---
const TeacherFeedbackScreen: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <Header title="老师回复详情" backTo="/subject/chinese" />

            <div className="m-4 bg-white rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                    <img src="https://i.pravatar.cc/100?img=33" className="w-14 h-14 rounded-full border-2 border-white shadow-sm" alt="Teacher" />
                    <div>
                        <div className="font-bold text-gray-900 text-lg">李老师</div>
                        <div className="text-xs text-gray-400 mt-1">回复于 2023-10-27 10:30</div>
                    </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-8 text-justify text-base">
                    家长您好，关于孩子最近在课堂上的表现，我观察到他在小组讨论中越来越积极，能够清晰地表达自己的观点，这是非常大的进步。为了进一步提升他的阅读理解能力，我整理了一份推荐书单，请查收附件。另外，我也录制了一段语音，补充说明了一些可以和他一起进行的亲子阅读技巧。希望这些建议对您有帮助！
                </p>

                {/* Audio Player Card */}
                <div className="bg-emerald-50/80 rounded-2xl p-4 flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center overflow-hidden relative shadow-lg shadow-emerald-100">
                        {/* Visual wave simulation */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                        <div className="flex justify-center items-center gap-0.5 h-full">
                            <div className="w-0.5 h-3 bg-emerald-400 animate-pulse"></div>
                            <div className="w-0.5 h-6 bg-emerald-300"></div>
                            <div className="w-0.5 h-4 bg-emerald-400"></div>
                            <div className="w-0.5 h-7 bg-white"></div>
                            <div className="w-0.5 h-3 bg-emerald-400"></div>
                            <div className="w-0.5 h-2 bg-emerald-300"></div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="font-bold text-gray-900 mb-0.5">补充建议</div>
                        <div className="text-xs text-gray-500">李老师</div>
                    </div>

                    <button className="w-12 h-12 rounded-full bg-emerald-400 text-white flex items-center justify-center hover:bg-emerald-500 shadow-lg shadow-emerald-200 transition">
                        <Play size={20} fill="white" className="ml-1" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="relative h-1.5 bg-emerald-100 rounded-full mb-2 mx-1">
                    <div className="absolute left-0 top-0 h-full w-1/2 bg-emerald-400 rounded-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full shadow border-2 border-white"></div>
                    </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-mono mb-8 px-1">
                    <span>1:17</span>
                    <span>2:23</span>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-3 -mx-3 rounded-xl transition">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                                <File size={24} />
                            </div>
                            <span className="font-bold text-gray-800">推荐书单.pdf</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-300" />
                    </div>
                </div>

            </div>
        </div>
    )
}

// --- Main App Component ---
const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/subjects" element={<SubjectListScreen />} />
                <Route path="/subject/:id" element={<SubjectDetailScreen />} />
                <Route path="/task/:id" element={<TaskDetailScreen />} />
                <Route path="/teacher-feedback/:id" element={<TeacherFeedbackScreen />} />
                <Route path="/add-comment" element={<AddCommentScreen />} />
            </Routes>
        </HashRouter>
    );
};

export default App;