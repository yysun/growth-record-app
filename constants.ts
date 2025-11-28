import { Subject, User } from './types';

export const CURRENT_USER: User = {
  name: '王小明',
  avatar: 'https://i.pravatar.cc/300?img=12', // Updated to a better avatar url or keep placeholder
  grade: '三年级 (2) 班',
};

// Data derived from Screenshot 2, 3, 4, 5
export const CHINESE_SUBJECT: Subject = {
  id: 'chinese',
  name: '语文',
  units: [
    {
      id: 'u1',
      title: '第一单元：自然之声', // Using title from Card View (Screen 4)
      items: [
        {
          id: 'task1',
          title: '阅读理解 A',
          type: 'assignment',
          scoreLabel: '掌握程度：熟练',
          date: '10-12',
          summary: '能抓住文章主旨，理解作者意图。',
          tags: [],
        },
        {
          id: 'task2',
          title: '写作练习 A',
          type: 'assignment',
          scoreLabel: '掌握程度：良好',
          date: '09-28',
          summary: '',
        },
        {
          id: 'exam1',
          title: '第一单元测试', // Changed to match Screen 4
          type: 'exam',
          score: 92,
          scoreLabel: '得分：92 / 100',
          date: '09-28', // Adjusted date
          summary: '单元测试成绩优秀，基础知识掌握牢固，但在古诗词默写部分有少量错别字，需加强记忆。',
          tags: ['待点评'],
        },
        {
          id: 'report1',
          title: '《春》课文学习报告',
          type: 'feedback',
          date: '2023年9月15日',
          summary: '学生在本单元的阅读理解和写作练习中表现出色，能够准确把握文章主旨，并运用多种修辞手法进行仿...',
          tags: ['家长已点评', '老师已回复'],
        }
      ],
    },
    {
      id: 'u2',
      title: '第二单元：童年趣事',
      items: [
        {
          id: 'essay1',
          title: '作文：《我的童年》',
          type: 'assignment',
          date: '2023年10月12日',
          summary: '作文内容真实感人，情感表达细腻。结构完整，层次清晰，但个别句子可以更加精炼。',
          tags: ['家长已点评', '老师已回复'],
        },
        {
            id: 'poem1',
            title: '诗词背诵',
            type: 'assignment',
            scoreLabel: '掌握程度：熟练',
            date: '10-20',
        },
        {
            id: 'appreciation',
            title: '意境赏析',
            type: 'assignment',
            scoreLabel: '掌握程度：良好',
            date: '10-22',
        }
      ],
    },
    {
        id: 'u3',
        title: '第三单元：观察与发现',
        items: [],
    },
    // Adding extra items for Timeline View (Screen 5) that might span units or be extras
    {
        id: 'u_extra',
        title: '其他',
        items: [
             {
                id: 'exam5',
                title: '第五单元测试',
                type: 'exam',
                date: '10-28',
                summary: '摘要：作文部分想象力丰富，但在标点符号使用上需加强。',
            },
            {
                id: 'speech',
                title: '课堂演讲：我的夏天',
                type: 'activity',
                date: '09-25',
                summary: '摘要：表达流畅，有自信，但内容组织稍显松散。'
            },
            {
                id: 'exam4',
                title: '第四单元测验',
                type: 'exam',
                date: '09-08',
                summary: '摘要：掌握了本单元所有生字词。'
            }
        ]
    }
  ],
};

export const MATH_SUBJECT: Subject = {
    id: 'math',
    name: '数学',
    units: [],
}

export const ENGLISH_SUBJECT: Subject = {
    id: 'english',
    name: '英语',
    units: [],
}