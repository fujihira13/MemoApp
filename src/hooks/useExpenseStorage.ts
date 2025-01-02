import { useState, useEffect } from 'react'
import { storeData, getData, STORAGE_KEYS } from '../utils/storage'
import { Expense } from '../types/expense'

interface UseExpenseStorageReturn {
  expenses: Expense[]
  loading: boolean
  addExpense: (newExpense: Expense) => Promise<void>
  loadExpenses: () => Promise<void>
}

export const useExpenseStorage = (): UseExpenseStorageReturn => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  // 支出データの読み込み
  useEffect(() => {
    void loadExpenses()
  }, [])

  // 支出データを読み込む
  const loadExpenses = async (): Promise<void> => {
    try {
      const savedExpenses = await getData<Expense[]>(STORAGE_KEYS.EXPENSES)
      if (savedExpenses) {
        setExpenses(savedExpenses)
      }
    } catch (error) {
      console.error('支出データの読み込みエラー:', error)
    } finally {
      setLoading(false)
    }
  }

  // 新しい支出を追加
  const addExpense = async (newExpense: Expense): Promise<void> => {
    try {
      const updatedExpenses = [newExpense, ...expenses]
      await storeData(STORAGE_KEYS.EXPENSES, updatedExpenses)
      setExpenses(updatedExpenses)
    } catch (error) {
      console.error('支出の追加エラー:', error)
      throw error
    }
  }

  return { expenses, loading, addExpense, loadExpenses }
}
