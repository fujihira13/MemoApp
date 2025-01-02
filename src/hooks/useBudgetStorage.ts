import { useState, useEffect } from 'react'
import { storeData, getData, STORAGE_KEYS } from '../utils/storage'
import { BudgetFormData } from '../types/budget'

interface UseBudgetStorageReturn {
  budgetSettings: BudgetFormData | null
  loading: boolean
  saveBudgetSettings: (settings: BudgetFormData) => Promise<void>
}

export const useBudgetStorage = (): UseBudgetStorageReturn => {
  const [budgetSettings, setBudgetSettings] = useState<BudgetFormData | null>(
    null
  )
  const [loading, setLoading] = useState(true)

  // 予算設定の読み込み
  useEffect(() => {
    void loadBudgetSettings()
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
    } catch (error) {
      console.error('予算設定の保存エラー:', error)
      throw error
    }
  }

  return { budgetSettings, loading, saveBudgetSettings }
}
