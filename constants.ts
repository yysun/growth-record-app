/**
 * 成长档案常量配置
 *
 * Features:
 * - 当前用户信息配置（幼儿园场景）
 * - 成长记录数据（语言表达、社交能力、手工创作、户外活动、幼儿成长测评）
 * - 英语课程档案数据
 * - 幼小衔接课程档案数据
 * - 老师寄语和家长留言数据
 *
 * Implementation notes:
 * - 支持三级分类结构：主板块 > 分类 > 子分类
 * - 幼小衔接课程档案支持嵌套子分类
 *
 * Recent changes:
 * - 2025-11-28: 重构数据结构，从小学学科模式调整为幼儿园成长档案模式
 */

import { User, BasicInfo, Section, RecordItem } from './types';

// ========== 用户信息 ==========
export const CURRENT_USER: User = {
  name: '王小明',
  avatar: 'https://i.pravatar.cc/300?img=12',
  className: '中二班',
  birthDate: '2019年6月15日',
  enrollDate: '2022年9月1日',
};

// ========== 基本信息 ==========
export const BASIC_INFO: BasicInfo = {
  semester: '2024-2025学年 第一学期',
  className: '中二班',
  headTeacher: '李老师',
  assistantTeacher: '张老师',
};

// ========== 成长记录 ==========
export const GROWTH_RECORDS: Section = {
  id: 'growth-records',
  name: '成长记录',
  icon: 'sprout',
  categories: [
    {
      id: 'language-expression',
      name: '语言表达',
      icon: 'message-circle',
      items: [
        {
          id: 'lang-1',
          title: '故事讲述活动',
          type: 'activity',
          date: '11-25',
          summary: '能够完整讲述《小红帽》故事，表达清晰，情感丰富。',
          tags: ['表达清晰', '有进步'],
          scoreLabel: '表现优秀',
        },
        {
          id: 'lang-2',
          title: '儿歌朗诵',
          type: 'activity',
          date: '11-20',
          summary: '能够背诵并朗诵3首儿歌，发音准确，节奏感好。',
          tags: ['发音准确'],
          scoreLabel: '表现良好',
        },
        {
          id: 'lang-3',
          title: '日常对话观察',
          type: 'observation',
          date: '11-15',
          summary: '主动与老师分享周末经历，能使用完整句子描述事件。',
          tags: ['主动表达'],
        },
      ],
    },
    {
      id: 'social-skills',
      name: '社交能力',
      icon: 'users',
      items: [
        {
          id: 'social-1',
          title: '合作游戏观察',
          type: 'observation',
          date: '11-22',
          summary: '在积木区与同伴合作搭建城堡，能够协商分工，遇到冲突时能寻求老师帮助。',
          tags: ['合作意识', '有进步'],
          scoreLabel: '表现良好',
        },
        {
          id: 'social-2',
          title: '分享活动',
          type: 'activity',
          date: '11-18',
          summary: '主动将自己的玩具分享给新来的小朋友，表现出同理心。',
          tags: ['乐于分享'],
        },
      ],
    },
    {
      id: 'handicraft',
      name: '手工创作',
      icon: 'palette',
      items: [
        {
          id: 'craft-1',
          title: '秋叶拼贴画',
          type: 'artwork',
          date: '11-20',
          summary: '使用收集的落叶创作了一幅小动物拼贴画，创意独特，色彩搭配和谐。',
          tags: ['创意丰富', '作品展示'],
          image: 'https://picsum.photos/id/28/200/200',
        },
        {
          id: 'craft-2',
          title: '黏土小动物',
          type: 'artwork',
          date: '11-12',
          summary: '独立完成小兔子黏土作品，细节处理较好。',
          tags: ['动手能力强'],
          image: 'https://picsum.photos/id/29/200/200',
        },
      ],
    },
    {
      id: 'outdoor-activities',
      name: '户外活动',
      icon: 'sun',
      items: [
        {
          id: 'outdoor-1',
          title: '晨间运动',
          type: 'activity',
          date: '11-24',
          summary: '积极参与早操活动，动作协调，能跟上节奏。',
          tags: ['积极参与'],
          scoreLabel: '表现良好',
        },
        {
          id: 'outdoor-2',
          title: '秋游活动',
          type: 'activity',
          date: '11-08',
          summary: '参加植物园秋游，对自然观察兴趣浓厚，能识别多种常见植物。',
          tags: ['好奇心强', '精彩瞬间'],
          image: 'https://picsum.photos/id/30/200/200',
        },
      ],
    },
    {
      id: 'development-assessment',
      name: '幼儿成长测评',
      icon: 'clipboard-check',
      subcategories: [
        {
          id: 'cognitive-dev',
          name: '认知发展',
          items: [
            {
              id: 'cog-1',
              title: '认知能力月评',
              type: 'assessment',
              date: '11-01',
              summary: '能够识别基本颜色和形状，数数能力达到20以内，分类能力良好。',
              scoreLabel: '发展良好',
              tags: ['月度测评'],
            },
          ],
        },
        {
          id: 'emotional-management',
          name: '情绪管理',
          items: [
            {
              id: 'emo-1',
              title: '情绪发展观察',
              type: 'observation',
              date: '11-15',
              summary: '能够识别并表达基本情绪，在遇到挫折时能够在老师引导下调整情绪。',
              scoreLabel: '发展中',
              tags: ['需关注'],
            },
          ],
        },
        {
          id: 'self-care',
          name: '自理能力',
          items: [
            {
              id: 'care-1',
              title: '生活自理评估',
              type: 'assessment',
              date: '11-10',
              summary: '能够独立进餐、如厕、整理个人物品，穿脱衣物需要少量帮助。',
              scoreLabel: '表现良好',
              tags: ['有进步'],
            },
          ],
        },
        {
          id: 'behavior-habits',
          name: '行为习惯',
          items: [
            {
              id: 'habit-1',
              title: '日常行为观察',
              type: 'observation',
              date: '11-20',
              summary: '能够遵守基本班级规则，排队等候有耐心，用餐习惯良好。',
              scoreLabel: '表现优秀',
            },
          ],
        },
        {
          id: 'comprehensive-assessment',
          name: '综合测评结果',
          items: [
            {
              id: 'comp-1',
              title: '期中综合发展评估',
              type: 'assessment',
              date: '11-15',
              summary: '整体发展良好，语言表达和社交能力突出，自理能力持续进步，建议加强精细动作练习。',
              scoreLabel: '发展良好',
              tags: ['期中测评', '综合报告'],
            },
          ],
        },
      ],
    },
  ],
};

// ========== 英语课程档案 ==========
export const ENGLISH_COURSE: Section = {
  id: 'english-course',
  name: '英语课程档案',
  icon: 'globe',
  categories: [
    {
      id: 'english-listening',
      name: '英语听力',
      icon: 'headphones',
      items: [
        {
          id: 'en-listen-1',
          title: '指令听力练习',
          type: 'activity',
          date: '11-22',
          summary: '能够听懂并执行简单英语指令，如 "Stand up", "Sit down", "Clap your hands"。',
          scoreLabel: '表现良好',
          tags: ['基础指令'],
        },
        {
          id: 'en-listen-2',
          title: '英语歌曲活动',
          type: 'activity',
          date: '11-18',
          summary: '对英语儿歌表现出浓厚兴趣，能够跟唱简单段落。',
          tags: ['兴趣浓厚'],
        },
      ],
    },
    {
      id: 'english-speaking',
      name: '英语口语',
      icon: 'mic',
      items: [
        {
          id: 'en-speak-1',
          title: '日常问候练习',
          type: 'activity',
          date: '11-20',
          summary: '能够主动使用 "Good morning", "Hello", "Thank you" 等日常用语。',
          scoreLabel: '表现优秀',
          tags: ['主动表达'],
        },
        {
          id: 'en-speak-2',
          title: '自我介绍',
          type: 'activity',
          date: '11-12',
          summary: '能够用英语说出自己的名字和年龄。',
          scoreLabel: '表现良好',
        },
      ],
    },
    {
      id: 'word-recognition',
      name: '单词认读',
      icon: 'book-open',
      items: [
        {
          id: 'word-1',
          title: '颜色单词学习',
          type: 'activity',
          date: '11-18',
          summary: '能够认读并说出 red, blue, yellow, green 四种颜色单词。',
          scoreLabel: '表现良好',
          tags: ['颜色主题'],
        },
        {
          id: 'word-2',
          title: '动物单词学习',
          type: 'activity',
          date: '11-10',
          summary: '能够认读 cat, dog, fish, bird 等常见动物单词。',
          scoreLabel: '表现良好',
          tags: ['动物主题'],
        },
      ],
    },
    {
      id: 'story-comprehension',
      name: '故事理解',
      icon: 'book',
      items: [
        {
          id: 'story-1',
          title: '绘本故事课',
          type: 'activity',
          date: '11-15',
          summary: '通过图片辅助，能够理解英语绘本《Brown Bear》的主要内容。',
          scoreLabel: '表现良好',
          tags: ['绘本阅读'],
        },
      ],
    },
    {
      id: 'english-unit-test',
      name: '单元测评',
      icon: 'file-text',
      items: [
        {
          id: 'en-test-1',
          title: '11月英语综合评估',
          type: 'assessment',
          date: '11-25',
          summary: '听力理解良好，能认读15个常用单词，口语表达有进步，建议多练习日常对话。',
          scoreLabel: '良好',
          tags: ['月度测评'],
        },
      ],
    },
  ],
};

// ========== 幼小衔接课程档案 ==========
export const TRANSITION_COURSE: Section = {
  id: 'transition-course',
  name: '幼小衔接课程档案',
  icon: 'graduation-cap',
  categories: [
    {
      id: 'math-basics',
      name: '数学基础',
      icon: 'calculator',
      subcategories: [
        {
          id: 'quantity-concept',
          name: '数量概念',
          items: [
            {
              id: 'math-qty-1',
              title: '数量认知练习',
              type: 'activity',
              date: '11-22',
              summary: '能够进行1-20的点数和认读，理解多少、大小的概念。',
              scoreLabel: '掌握良好',
              tags: ['基础认知'],
            },
          ],
        },
        {
          id: 'simple-calculation',
          name: '简单运算',
          items: [
            {
              id: 'math-calc-1',
              title: '10以内加减法',
              type: 'activity',
              date: '11-20',
              summary: '能够理解加法和减法的含义，完成5以内的加减运算。',
              scoreLabel: '学习中',
              tags: ['运算入门'],
            },
          ],
        },
        {
          id: 'shape-space',
          name: '图形空间',
          items: [
            {
              id: 'math-shape-1',
              title: '几何图形认知',
              type: 'activity',
              date: '11-15',
              summary: '能够识别圆形、三角形、正方形、长方形，并能在生活中找到相应图形。',
              scoreLabel: '掌握良好',
              tags: ['图形认知'],
            },
          ],
        },
      ],
    },
    {
      id: 'reading-literacy',
      name: '阅读与识字',
      icon: 'book-open',
      subcategories: [
        {
          id: 'pinyin-intro',
          name: '拼音启蒙',
          items: [
            {
              id: 'pinyin-1',
              title: '声母学习',
              type: 'activity',
              date: '11-20',
              summary: '能够认读并发音 b, p, m, f, d, t, n, l 等声母。',
              scoreLabel: '学习中',
              tags: ['拼音基础'],
            },
          ],
        },
        {
          id: 'character-recognition',
          name: '识字量',
          items: [
            {
              id: 'char-1',
              title: '常用字认读',
              type: 'activity',
              date: '11-18',
              summary: '能够认读自己的姓名及20个常用汉字。',
              scoreLabel: '表现良好',
              tags: ['识字积累'],
            },
          ],
        },
        {
          id: 'reading-comprehension',
          name: '阅读理解',
          items: [
            {
              id: 'read-1',
              title: '绘本阅读理解',
              type: 'activity',
              date: '11-12',
              summary: '能够理解简单绘本故事的主要内容，并能回答相关问题。',
              scoreLabel: '表现良好',
              tags: ['阅读能力'],
            },
          ],
        },
      ],
    },
    {
      id: 'learning-habits',
      name: '学习习惯',
      icon: 'clock',
      subcategories: [
        {
          id: 'focus-attention',
          name: '专注力',
          items: [
            {
              id: 'focus-1',
              title: '课堂专注力观察',
              type: 'observation',
              date: '11-22',
              summary: '能够保持15分钟左右的专注听讲，完成分配的任务。',
              scoreLabel: '发展中',
              tags: ['需加强'],
            },
          ],
        },
        {
          id: 'posture-writing',
          name: '坐姿书写',
          items: [
            {
              id: 'posture-1',
              title: '握笔姿势与坐姿',
              type: 'observation',
              date: '11-18',
              summary: '握笔姿势基本正确，坐姿需要提醒保持，能够进行简单的描红练习。',
              scoreLabel: '学习中',
              tags: ['持续练习'],
            },
          ],
        },
        {
          id: 'homework-habits',
          name: '作业习惯',
          items: [
            {
              id: 'homework-1',
              title: '任务完成习惯',
              type: 'observation',
              date: '11-15',
              summary: '能够按要求完成老师布置的简单任务，开始建立责任意识。',
              scoreLabel: '表现良好',
            },
          ],
        },
      ],
    },
    {
      id: 'transition-assessment',
      name: '综合衔接测评',
      icon: 'award',
      items: [
        {
          id: 'trans-test-1',
          title: '11月幼小衔接评估',
          type: 'assessment',
          date: '11-25',
          summary: '数学基础扎实，阅读与识字进步明显，学习习惯仍需培养，建议在家多进行专注力训练。',
          scoreLabel: '发展良好',
          tags: ['月度测评', '综合报告'],
        },
      ],
    },
  ],
};

// ========== 老师寄语 ==========
export const TEACHER_MESSAGES: RecordItem[] = [
  {
    id: 'teacher-msg-1',
    title: '期中老师寄语',
    type: 'feedback',
    date: '11-15',
    summary: '小明这学期进步很大！语言表达能力越来越强，能够主动分享自己的想法。在与小朋友相处中也更加友善。希望继续保持好奇心，在探索中快乐成长！',
    tags: ['期中寄语'],
    teacherFeedback: {
      avatar: 'https://i.pravatar.cc/100?img=33',
      name: '李老师',
      date: '2024年11月15日',
      content: '小明这学期进步很大！语言表达能力越来越强，能够主动分享自己的想法。在与小朋友相处中也更加友善。希望继续保持好奇心，在探索中快乐成长！',
    },
  },
  {
    id: 'teacher-msg-2',
    title: '开学老师寄语',
    type: 'feedback',
    date: '09-01',
    summary: '欢迎小明进入中二班！希望在新学期里，小明能够快乐学习，健康成长，交到更多好朋友！',
    tags: ['开学寄语'],
    teacherFeedback: {
      avatar: 'https://i.pravatar.cc/100?img=33',
      name: '李老师',
      date: '2024年9月1日',
      content: '欢迎小明进入中二班！希望在新学期里，小明能够快乐学习，健康成长，交到更多好朋友！',
    },
  },
];

// ========== 家长留言 ==========
export const PARENT_MESSAGES: RecordItem[] = [
  {
    id: 'parent-msg-1',
    title: '期中反馈',
    type: 'feedback',
    date: '11-18',
    summary: '感谢老师们的辛苦付出！小明回家经常分享在幼儿园的开心事，我们看到他的成长很欣慰。希望他能继续保持对学习的热情！',
    tags: ['家长反馈'],
  },
  {
    id: 'parent-msg-2',
    title: '周末活动分享',
    type: 'activity',
    date: '11-10',
    summary: '周末带小明去了科技馆，他对恐龙展览特别感兴趣，回来还画了一幅恐龙的画，想和老师小朋友们分享。',
    tags: ['家园共育'],
    image: 'https://picsum.photos/id/31/200/200',
  },
];

// 导出所有板块配置
export const ALL_SECTIONS: Section[] = [GROWTH_RECORDS, ENGLISH_COURSE, TRANSITION_COURSE];