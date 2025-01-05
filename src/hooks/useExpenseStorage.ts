import { useState, useEffect, useCallback } from 'react'
import { storeData, getData, STORAGE_KEYS } from '../utils/storage'
import { Expense } from '../types/expense'

// 更新イベントを管理するためのイベントエミッター
const subscribers = new Set<() => void>()

interface UseExpenseStorageReturn {
  expenses: Expense[]
  loading: boolean
  addExpense: (newExpense: Expense) => Promise<void>
  loadExpenses: () => Promise<void>
  deleteExpense: (expenseId: string) => Promise<void>
  editExpense: (updatedExpense: Expense) => Promise<void>
  subscribe: (callback: () => void) => () => void
}

export const useExpenseStorage = (): UseExpenseStorageReturn => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  // データ読み込みをuseCallbackでメモ化
  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true)
      const savedExpenses = await getData<Expense[]>(STORAGE_KEYS.EXPENSES)
      if (savedExpenses) {
        const sortedExpenses = savedExpenses.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        setExpenses(sortedExpenses)
      }
    } catch (error) {
      console.error('支出データの読み込みエラー:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // 初回マウント時にデータを読み込む
  useEffect(() => {
    void loadExpenses()
  }, [loadExpenses])

  // サブスクライブ関数
  const subscribe = useCallback((callback: () => void): (() => void) => {
    subscribers.add(callback)
    return () => {
      subscribers.delete(callback)
    }
  }, [])

  // 全てのサブスクライバーに通知
  const notifySubscribers = useCallback(() => {
    subscribers.forEach((callback) => callback())
  }, [])

  const addExpense = async (newExpense: Expense): Promise<void> => {
    try {
      const updatedExpenses = [newExpense, ...expenses]
      await storeData(STORAGE_KEYS.EXPENSES, updatedExpenses)
      setExpenses(updatedExpenses)
      notifySubscribers() // 追加
    } catch (error) {
      console.error('支出の追加エラー:', error)
      throw error
    }
  }

  const deleteExpense = async (expenseId: string): Promise<void> => {
    try {
      const updatedExpenses = expenses.filter(
        (expense) => expense.id !== expenseId
      )
      await storeData(STORAGE_KEYS.EXPENSES, updatedExpenses)
      setExpenses(updatedExpenses)
      notifySubscribers() // 追加
    } catch (error) {
      console.error('支出の削除エラー:', error)
      throw error
    }
  }

  const editExpense = async (updatedExpense: Expense): Promise<void> => {
    try {
      const updatedExpenses = expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
      await storeData(STORAGE_KEYS.EXPENSES, updatedExpenses)
      setExpenses(updatedExpenses)
      notifySubscribers() // 追加
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
    editExpense,
    subscribe // 新しい関数を追加
  }
}
