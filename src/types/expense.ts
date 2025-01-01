export type ExpenseCategory =
  | 'grocery'
  | 'eating_out'
  | 'snack'
  | 'drinking'
  | 'convenience'
  | 'home_cooking'
  | 'other'

export type MealTime = 'breakfast' | 'lunch' | 'dinner' | 'none'

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

export type IconName =
  | 'cart'
  | 'silverware-fork-knife'
  | 'food'
  | 'glass-wine'
  | 'store'
  | 'chevron-left'
  | 'chevron-right'
  | 'trending-up'
  | 'trending-down'
