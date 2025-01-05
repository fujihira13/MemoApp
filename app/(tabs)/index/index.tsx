import React, { useMemo } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { SpendingSummaryCard } from '../../../src/compornents/cards/SpendingSummaryCard'
import { TabView } from '../../../src/compornents/common/TabView'
import { MealTimeStats } from '../../../src/compornents/stats/MealTimeStats'
import { ExpenseHistory } from '../../../src/compornents/stats/ExpenseHistory'
import { useState } from 'react'
import { DailyReport } from '../../../src/compornents/stats/DailyReport'
import { CookingAnalysis } from '../../../src/compornents/stats/CookingAnalysis'
import { useExpenseStorage } from '../../../src/hooks/useExpenseStorage'
import { MonthPicker } from '../../../src/compornents/common/MonthPicker'

export default function Home(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState('timeRange')
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const { expenses, loading } = useExpenseStorage()

  // 今月の支出データを計算
  const calculateMonthlyData = (): {
    totalExpense: number
    wasteExpense: number
    monthlyBudget: number
  } => {
    if (loading) return { totalExpense: 0, wasteExpense: 0, monthlyBudget: 0 }

    // 選択された月の支出をフィルタリング
    const selectedMonthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return (
        expenseDate.getMonth() === selectedMonth.getMonth() &&
        expenseDate.getFullYear() === selectedMonth.getFullYear()
      )
    })

    // 総支出を計算（自炊以外）
    const totalExpense = selectedMonthExpenses.reduce(
      (sum, expense) => sum + (expense.isHomeCooking ? 0 : expense.amount),
      0
    )

    // 浪費を計算（外食、間食、飲み会、コンビニ）
    const wasteCategories = ['eating_out', 'snack', 'drinking', 'convenience']
    const wasteExpense = selectedMonthExpenses.reduce((sum, expense) => {
      if (
        wasteCategories.includes(expense.category) &&
        !expense.isHomeCooking
      ) {
        return sum + expense.amount
      }
      return sum
    }, 0)

    // 月間予算を取得（例として100000を使用）
    const monthlyBudget = 100000

    return { totalExpense, wasteExpense, monthlyBudget }
  }

  const summaryData = useMemo(
    () => calculateMonthlyData(),
    [expenses, loading, selectedMonth]
  )

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
            data={summaryData}
            selectedMonth={selectedMonth}
          />
        </View>

        {/* タブビュー */}
        <TabView tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* タブコンテンツ */}
        <View style={styles.contentContainer}>
          {activeTab === 'timeRange' && (
            <MealTimeStats selectedDate={selectedMonth} />
          )}
          {activeTab === 'daily' && <DailyReport />}
          {activeTab === 'analysis' && (
            <CookingAnalysis selectedMonth={selectedMonth} />
          )}
        </View>

        {/* 支出履歴 */}
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
