import { ScrollView } from 'react-native'
import { MonthlyReport } from '../../../src/compornents/reports/MonthlyReport'
import { Stack } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { useExpenseStorage } from '../../../src/hooks/useExpenseStorage'
import { useBudgetStorage } from '../../../src/hooks/useBudgetStorage'
import { styles } from './report.styles'

/**
 * ReportScreenコンポーネント
 * レポート画面を表示する
 * @returns {React.JSX.Element} レポート画面のJSX要素
 */
export default function ReportScreen(): React.JSX.Element {
  // useExpenseStorageフックからsubscribe関数を取得
  const { subscribe: subscribeExpense } = useExpenseStorage()
  // useBudgetStorageフックからsubscribe関数を取得
  const { subscribe: subscribeBudget } = useBudgetStorage()
  // 更新トリガー用のステート
  const [updateTrigger, setUpdateTrigger] = useState(0)

  useEffect(() => {
    // 支出データと予算設定の変更を購読
    const unsubscribeExpense = subscribeExpense(() => {
      setUpdateTrigger((prev) => prev + 1)
    })

    const unsubscribeBudget = subscribeBudget(() => {
      setUpdateTrigger((prev) => prev + 1)
    })

    // コンポーネントのアンマウント時に購読を解除
    return (): void => {
      unsubscribeExpense()
      unsubscribeBudget()
    }
  }, [subscribeExpense, subscribeBudget])

  return (
    <>
      {/* 画面のヘッダー設定 */}
      <Stack.Screen
        options={{
          title: 'レポート',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' }
        }}
      />

      {/* スクロール可能なコンテナ */}
      <ScrollView style={styles.container}>
        {/* 月次レポートコンポーネント */}
        <MonthlyReport key={updateTrigger} />
      </ScrollView>
    </>
  )
}
