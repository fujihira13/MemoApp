import { useState, useEffect, useCallback } from 'react'
import { storeData, getData, STORAGE_KEYS } from '../utils/storage'
import { BudgetFormData } from '../types/budget'

// 更新イベントを管理するためのイベントエミッター
const subscribers = new Set<() => void>()

interface UseBudgetStorageReturn {
  budgetSettings: BudgetFormData | null
  loading: boolean
  saveBudgetSettings: (settings: BudgetFormData) => Promise<void>
  subscribe: (callback: () => void) => () => void
}

/**
 * 予算データの保存と取得を行うカスタムフック
 */
export const useBudgetStorage = (): UseBudgetStorageReturn => {
  const [budgetSettings, setBudgetSettings] = useState<BudgetFormData | null>(
    null
  )
  const [loading, setLoading] = useState(true)

  // 予算設定の読み込み
  useEffect(() => {
    void loadBudgetSettings()
  }, [])

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

  // 予算設定を読み込む
  const loadBudgetSettings = async (): Promise<void> => {
    try {
      const savedSettings = await getData<BudgetFormData>(
        STORAGE_KEYS.BUDGET_SETTINGS
      )
      if (savedSettings) {
        setBudgetSettings(savedSettings)
      }
    } catch (error) {
      console.error('予算設定の読み込みエラー:', error)
    } finally {
      setLoading(false)
    }
  }

  // 予算設定を保存
  const saveBudgetSettings = async (
    settings: BudgetFormData
  ): Promise<void> => {
    try {
      await storeData(STORAGE_KEYS.BUDGET_SETTINGS, settings)
      setBudgetSettings(settings)
      notifySubscribers() // 更新を通知
    } catch (error) {
      console.error('予算設定の保存エラー:', error)
      throw error
    }
  }

  return { budgetSettings, loading, saveBudgetSettings, subscribe }
}
