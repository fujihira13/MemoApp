import type { MaterialCommunityIcons } from '@expo/vector-icons'

export type IconName = keyof typeof MaterialCommunityIcons.glyphMap

export type ExpenseCategory =
  | 'grocery'
  | 'eating_out'
  | 'snack'
  | 'drinking'
  | 'convenience'
  | 'home_cooking'
  | 'other'

export type MealTime = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'none'

export interface Expense {
  id: string
  amount: number
  category: ExpenseCategory
  mealTime: MealTime
  isHomeCooking: boolean
  date: Date
  note: string
}

export interface ExpenseFormData {
  amount: string
  category: ExpenseCategory
  mealTime: MealTime
  isHomeCooking: boolean
  date: Date
  note: string
}

export interface ExpenseItem {
  id: string
  date: string
  mealTime: string
  category: string
  amount: number
  note: string
  isHomeCooking?: boolean
}

export interface Category {
  amount: number
  label: string
  icon: IconName
}

export interface MonthlyReportData {
  total: number
  previousMonth: number
  averagePerDay: number
  dailyBudget: number
  categories: Record<string, Category>
}

// カテゴリーごとの集計情報
interface CategorySummary {
  total: number
  count: number
  percentage: number
}

// カテゴリー別集計の型
export type CategorySummaries = {
  [key: string]: CategorySummary
}
