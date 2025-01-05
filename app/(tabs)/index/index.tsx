import React, { useMemo, useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { SpendingSummaryCard } from '../../../src/compornents/cards/SpendingSummaryCard'
import { TabView } from '../../../src/compornents/common/TabView'
import { MealTimeStats } from '../../../src/compornents/stats/MealTimeStats'
import { ExpenseHistory } from '../../../src/compornents/stats/ExpenseHistory'
import { DailyReport } from '../../../src/compornents/stats/DailyReport'
import { CookingAnalysis } from '../../../src/compornents/stats/CookingAnalysis'
import { useExpenseStorage } from '../../../src/hooks/useExpenseStorage'
import { MonthPicker } from '../../../src/compornents/common/MonthPicker'
import { useBudgetStorage } from '../../../src/hooks/useBudgetStorage'

const Home = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState('timeRange')
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const { subscribe } = useExpenseStorage() // loadingとexpensesを削除
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

  // calculateMonthlyDataを削除

  const tabs = [
    { id: 'timeRange', label: '時間帯別' },
    { id: 'daily', label: '日別レポート' },
    { id: 'analysis', label: '自炊分析' }
  ]

  return (
    <>
      <Stack.Screen
        options={{
          title: '食費管理アプリ',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' }
        }}
      />

      <ScrollView style={styles.container}>
        <MonthPicker
          selectedMonth={selectedMonth}
          onMonthChange={(newMonth) => setSelectedMonth(newMonth)}
        />
        <View style={styles.summaryContainer}>
          <SpendingSummaryCard
            selectedMonth={selectedMonth}
            key={updateTrigger} // keyを追加
          />
        </View>

        <TabView tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <View style={styles.contentContainer}>
          {renderTabContent[activeTab]}
        </View>

        <ExpenseHistory />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  summaryContainer: {
    padding: 16
  },
  contentContainer: {
    marginBottom: 16
  }
})

export default Home
