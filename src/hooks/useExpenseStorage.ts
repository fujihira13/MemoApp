import { useState, useEffect } from 'react'
import { storeData, getData, STORAGE_KEYS } from '../utils/storage'
import { Expense } from '../types/expense'

interface UseExpenseStorageReturn {
  expenses: Expense[]
  loading: boolean
  addExpense: (newExpense: Expense) => Promise<void>
  loadExpenses: () => Promise<void>
  deleteExpense: (expenseId: string) => Promise<void>
  editExpense: (updatedExpense: Expense) => Promise<void>
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
    } catch (error: unknown) {
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

  // 保存時
  const saveExpense = async (expense: Expense): Promise<void> => {
    try {
      const expenseToSave: Expense = {
        ...expense,
        date:
          expense.date instanceof Date
            ? expense.date.toISOString()
            : expense.date
      }
      await storeData(STORAGE_KEYS.EXPENSES, expenseToSave)
    } catch (error: unknown) {
      console.error('保存エラー:', error)
    }
  }

  // 取得時
  const getExpenses = async (): Promise<Expense[]> => {
    try {
      const savedExpenses = await getData<Expense[]>(STORAGE_KEYS.EXPENSES)
      if (savedExpenses) {
        setExpenses(savedExpenses)
        return savedExpenses
      }
      return []
    } catch (error) {
      console.error('取得エラー:', error)
      return []
    }
  }

  // 支出データを削除する
  const deleteExpense = async (expenseId: string): Promise<void> => {
    try {
      const updatedExpenses = expenses.filter(
        (expense) => expense.id !== expenseId
      )
      await storeData(STORAGE_KEYS.EXPENSES, updatedExpenses)
      setExpenses(updatedExpenses)
    } catch (error) {
      console.error('支出の削除エラー:', error)
      throw error
    }
  }

  // 支出データを編集する
  const editExpense = async (updatedExpense: Expense): Promise<void> => {
    try {
      const updatedExpenses = expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
      await storeData(STORAGE_KEYS.EXPENSES, updatedExpenses)
      setExpenses(updatedExpenses)
    } catch (error) {
      console.error('支出の編集エラー:', error)
      throw error
    }
  }

  return {
    expenses,
    loading,
    addExpense,
    loadExpenses,
    deleteExpense,
    editExpense
  }
}
