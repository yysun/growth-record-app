/**
 * 成长档案类型定义
 *
 * Features:
 * - 用户信息（幼儿园场景）
 * - 三级分类结构：Section > Category > Subcategory
 * - 记录项类型：观察记录、作品、测评、活动、反馈
 *
 * Recent changes:
 * - 2025-11-28: 重构为幼儿园成长档案数据结构
 */

// 用户信息（幼儿园场景）
export interface User {
  name: string;
  avatar: string;
  className: string;      // 班级名称
  birthDate?: string;     // 出生日期
  enrollDate?: string;    // 入园日期
}

// 基本信息
export interface BasicInfo {
  semester: string;       // 学期
  className: string;      // 班级
  headTeacher: string;    // 班主任
  assistantTeacher?: string; // 副班主任
}

// 老师反馈详情
export interface TeacherFeedback {
  avatar: string;
  name: string;
  date: string;
  content: string;
  audioDuration?: string;
  attachment?: string;
}

// 记录项（最小单位）
export interface RecordItem {
  id: string;
  title: string;
  type: 'observation' | 'artwork' | 'assessment' | 'activity' | 'feedback';
  date: string;
  summary?: string;
  tags?: string[];
  image?: string;
  scoreLabel?: string;
  teacherFeedback?: TeacherFeedback;
}

// 子分类（可选的第三级）
export interface Subcategory {
  id: string;
  name: string;
  items: RecordItem[];
}

// 分类（第二级）
export interface Category {
  id: string;
  name: string;
  icon: string;
  items?: RecordItem[];           // 直接包含记录项
  subcategories?: Subcategory[];  // 或包含子分类
}

// 板块（第一级）
export interface Section {
  id: string;
  name: string;
  icon: string;
  categories: Category[];
}

// 兼容旧类型（用于渐进迁移，可后续删除）
export type SubjectItem = RecordItem;
export interface SubjectUnit {
  id: string;
  title: string;
  items: RecordItem[];
}