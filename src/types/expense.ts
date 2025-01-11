import type { MaterialCommunityIcons } from '@expo/vector-icons'

// アイコン名の型定義
export type IconName = keyof typeof MaterialCommunityIcons.glyphMap

// 支出カテゴリーの型定義
export type ExpenseCategory =
  | 'grocery'
  | 'eating_out'
  | 'snack'
  | 'drinking'
  | 'convenience'
  | 'other'
  | 'home_cooking'

// 食事の時間帯の型定義
export type MealTime = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'none'

// 支出データのインターフェース
export interface Expense {
  id: string
  amount: number
  category: ExpenseCategory
  mealTime: MealTime
  isHomeCooking: boolean
  date: string | Date
  note?: string
}

// 支出フォームのデータインターフェース
export interface ExpenseFormData {
  amount: string
  category: ExpenseCategory
  mealTime: MealTime
  isHomeCooking: boolean
  date: Date
  note: string
}

// 支出アイテムのインターフェース
export interface ExpenseItem {
  id: string
  date: string
  mealTime: MealTime
  category: string
  amount: number
  note: string
  isHomeCooking?: boolean
}

// カテゴリーのインターフェース
export interface Category {
  amount: number
  label: string
  icon: IconName
}

// 月次レポートのデータインターフェース
export interface MonthlyReportData {
  total: number
  previousMonth: number
  averagePerDay: number
  dailyBudget: number
  categories: Record<string, Category>
}

// カテゴリーごとの集計情報のインターフェース
export interface CategorySummary {
  total: number
  count: number
  percentage: number
}

// カテゴリー別集計のインターフェース
export interface CategorySummaries {
  [category: string]: CategorySummary
}
