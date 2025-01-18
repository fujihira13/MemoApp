import React, { useMemo, useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Stack } from 'expo-router'
import { SpendingSummaryCard } from '../../../src/components/cards/SpendingSummaryCard'
import { TabView } from '../../../src/components/common/TabView'
import { MealTimeStats } from '../../../src/components/stats/MealTimeStats'
import { ExpenseHistory } from '../../../src/components/stats/ExpenseHistory'
import { DailyReport } from '../../../src/components/stats/DailyReport'
import { CookingAnalysis } from '../../../src/components/stats/CookingAnalysis'
import { useExpenseStorage } from '../../../src/hooks/useExpenseStorage'
import { MonthPicker } from '../../../src/components/common/MonthPicker'
import { useBudgetStorage } from '../../../src/hooks/useBudgetStorage'
import { styles } from './index.styles'

/**
 * Homeコンポーネント
 * ダッシュボード画面を表示する
 * @returns {React.JSX.Element} ダッシュボード画面のJSX要素
 */
export default function Home(): React.JSX.Element {
  // 選択中のタブを管理するステート
  const [activeTab, setActiveTab] = useState('timeRange')
  // 選択中の月を管理するステート
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  // useExpenseStorageフックからsubscribe関数を取得
  const { subscribe } = useExpenseStorage()
  // 更新トリガー用のステート
  const [updateTrigger, setUpdateTrigger] = useState(0)

  // データ更新を検知するためのサブスクリプション
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setUpdateTrigger((prev) => prev + 1)
    })
    return (): void => {
      unsubscribe()
    }
  }, [subscribe])

  // タブコンテンツのメモ化
  const renderTabContent = useMemo((): Record<string, React.JSX.Element> => {
    return {
      timeRange: (
        <MealTimeStats selectedDate={selectedMonth} key={updateTrigger} />
      ),
      daily: <DailyReport key={updateTrigger} />,
      analysis: (
        <CookingAnalysis selectedMonth={selectedMonth} key={updateTrigger} />
      )
    }
  }, [selectedMonth, updateTrigger])

  // タブの定義
  const tabs = [
    { id: 'timeRange', label: '時間帯別' },
    { id: 'daily', label: '日別レポート' },
    { id: 'analysis', label: '自炊分析' }
  ]

  return (
    <>
      {/* 画面のヘッダー設定 */}
      <Stack.Screen
        options={{
          title: '食費管理アプリ',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' }
        }}
      />

      {/* スクロール可能なコンテナ */}
      <ScrollView style={styles.container}>
        {/* 月選択コンポーネント */}
        <MonthPicker
          selectedMonth={selectedMonth}
          onMonthChange={(newMonth) => setSelectedMonth(newMonth)}
        />
        {/* 支出サマリーカードのコンテナ */}
        <View style={styles.summaryContainer}>
          {/* 支出サマリーカードコンポーネント */}
          <SpendingSummaryCard
            selectedMonth={selectedMonth}
            key={updateTrigger}
          />
        </View>

        {/* タブビューコンポーネント */}
        <TabView tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* タブコンテンツのコンテナ */}
        <View style={styles.contentContainer}>
          {renderTabContent[activeTab]}
        </View>

        {/* 支出履歴コンポーネント */}
        <ExpenseHistory key={updateTrigger} />
      </ScrollView>
    </>
  )
}
