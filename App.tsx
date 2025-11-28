/**
 * 主应用组件
 * 
 * Features:
 * - 路由配置
 * - 页面导航
 * 
 * Recent changes:
 * - 2024-11-28: 拆分所有页面组件到 pages/ 目录
 */

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './pages/HomeScreen';
import { SectionScreen } from './pages/SectionScreen';
import { RecordDetailScreen } from './pages/RecordDetailScreen';
import { TeacherMessagesScreen } from './pages/TeacherMessagesScreen';
import { TeacherMessageDetailScreen } from './pages/TeacherMessageDetailScreen';
import { ParentMessagesScreen } from './pages/ParentMessagesScreen';
import { AddCommentScreen } from './pages/AddCommentScreen';

const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/section/:id" element={<SectionScreen />} />
                <Route path="/record/:id" element={<RecordDetailScreen />} />
                <Route path="/teacher-messages" element={<TeacherMessagesScreen />} />
                <Route path="/teacher-message/:id" element={<TeacherMessageDetailScreen />} />
                <Route path="/parent-messages" element={<ParentMessagesScreen />} />
                <Route path="/add-comment" element={<AddCommentScreen />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
