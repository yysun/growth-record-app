/**
 * 添加评论页面组件
 * 
 * Features:
 * - 文本输入
 * - 照片上传
 * - 提交评论
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Image as ImageIcon } from 'lucide-react';
import { Header } from '../components/Header';

export const AddCommentScreen: React.FC = () => {
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
  );
};
