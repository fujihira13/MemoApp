import AsyncStorage from '@react-native-async-storage/async-storage'
import { Expense } from '../types/expense'
import { BudgetFormData } from '../types/budget'

// 支出データを保存するキー
export const STORAGE_KEYS = {
  EXPENSES: '@food_expenses:expenses',
  BUDGET_SETTINGS: '@food_expenses:budget_settings'
} as const

// データを保存する汎用関数
export const storeData = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (error) {
    console.error('保存エラー:', error)
    throw error
  }
}

// データを取得する汎用関数
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : null
  } catch (error) {
    console.error('取得エラー:', error)
    throw error
  }
}
