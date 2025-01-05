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
  const { expenses, loading, subscribe } = useExpenseStorage()
  const { budgetSettings } = useBudgetStorage()
  const [updateTrigger, setUpdateTrigger] = useState(0)

  // データ更新を検知するためのサブスクリプション
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      // 更新トリガーを変更して再レンダリングを強制
      setUpdateTrigger((prev) => prev + 1)
    })
    return (): void => {
      unsubscribe()
    }
  }, [subscribe])

  // タブコンテンツのメモ化（updateTriggerの変更で再計算）
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

  // 残りのコードは変更なし
  const calculateMonthlyData = useMemo((): {
    totalExpense: number
    wasteExpense: number
    monthlyBudget: number
  } => {
    if (loading) return { totalExpense: 0, wasteExpense: 0, monthlyBudget: 0 }

    const currentMonthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return (
        expenseDate.getMonth() === selectedMonth.getMonth() &&
        expenseDate.getFullYear() === selectedMonth.getFullYear()
      )
    })

    const totalExpense = currentMonthExpenses.reduce(
      (sum, expense) => sum + (expense.isHomeCooking ? 0 : expense.amount),
      0
    )

    const wasteCategories = ['eating_out', 'snack', 'drinking', 'convenience']
    const wasteExpense = currentMonthExpenses.reduce((sum, expense) => {
      if (
        wasteCategories.includes(expense.category) &&
        !expense.isHomeCooking
      ) {
        return sum + expense.amount
      }
      return sum
    }, 0)

    return {
      totalExpense,
      wasteExpense,
      monthlyBudget: Number(budgetSettings?.monthlyBudget) || 0
    }
  }, [expenses, loading, selectedMonth, budgetSettings])

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
            data={calculateMonthlyData}
            selectedMonth={selectedMonth}
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
