import React, { useState, useMemo } from 'react'
import { View, Text } from 'react-native'
import { Card } from '../common/Card'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from '../../styles/components/reports/MonthlyReport.styles'
import { useExpenseStorage } from '../../hooks/useExpenseStorage'
import { useBudgetStorage } from '../../hooks/useBudgetStorage'
import { CategorySummaries } from '../../types/expense'
import { MonthPicker } from '../common/MonthPicker'

export const MonthlyReport = (): React.JSX.Element => {
  const { expenses, loading } = useExpenseStorage()
  const { budgetSettings } = useBudgetStorage()
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  // カテゴリー名の日本語マッピング
  const categoryLabels: { [key: string]: string } = {
    grocery: 'スーパー',
    eating_out: '外食',
    snack: '間食',
    drinking: '飲み会',
    convenience: 'コンビニ',
    home_cooking: '自炊',
    other: 'その他'
  }

  // カテゴリーアイコンのマッピングを型安全に定義
  const categoryIcons: {
    [key: string]: keyof typeof MaterialCommunityIcons.glyphMap
  } = {
    grocery: 'cart',
    eating_out: 'silverware-fork-knife',
    snack: 'cookie',
    drinking: 'glass-wine',
    convenience: 'store',
    home_cooking: 'pot-steam',
    other: 'dots-horizontal'
  } as const

  // 月別データの計算（メモ化）
  const monthlyData = useMemo(() => {
    if (loading) return null

    // 選択された月のデータをフィルタリング
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return (
        expenseDate.getMonth() === selectedMonth.getMonth() &&
        expenseDate.getFullYear() === selectedMonth.getFullYear()
      )
    })

    // 前月のデータをフィルタリング
    const lastMonth = new Date(selectedMonth)
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    const lastMonthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return (
        expenseDate.getMonth() === lastMonth.getMonth() &&
        expenseDate.getFullYear() === lastMonth.getFullYear()
      )
    })

    // 合計金額の計算
    const total = filteredExpenses.reduce(
      (sum, expense) => sum + (expense.isHomeCooking ? 0 : expense.amount),
      0
    )

    const lastMonthTotal = lastMonthExpenses.reduce(
      (sum, expense) => sum + (expense.isHomeCooking ? 0 : expense.amount),
      0
    )

    // 日数で割って平均を計算
    const daysInMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0
    ).getDate()
    const averagePerDay = total / daysInMonth

    // 前月比の変化率を計算
    const percentageChange =
      lastMonthTotal === 0
        ? 0
        : ((total - lastMonthTotal) / lastMonthTotal) * 100

    return {
      total,
      averagePerDay,
      percentageChange,
      dailyBudget: budgetSettings?.dailyBudget || 3000,
      lastMonthTotal
    }
  }, [expenses, selectedMonth, loading, budgetSettings])

  // カテゴリー別集計の計算（メモ化）
  const categorySummaries = useMemo(() => {
    if (loading || !monthlyData) return {}

    const summaries: CategorySummaries = {}
    let grandTotal = 0

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date)
      if (
        expenseDate.getMonth() === selectedMonth.getMonth() &&
        expenseDate.getFullYear() === selectedMonth.getFullYear() &&
        !expense.isHomeCooking
      ) {
        const amount = expense.amount
        grandTotal += amount

        if (!summaries[expense.category]) {
          summaries[expense.category] = {
            total: 0,
            count: 0,
            percentage: 0
          }
        }

        summaries[expense.category].total += amount
        summaries[expense.category].count++
      }
    })

    // パーセンテージを計算
    Object.keys(summaries).forEach((category) => {
      summaries[category].percentage =
        (summaries[category].total / grandTotal) * 100
    })

    return summaries
  }, [expenses, selectedMonth, loading])

  if (loading || !monthlyData) {
    return <Text>読み込み中...</Text>
  }

  return (
    <View style={styles.container}>
      <MonthPicker
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
      {/* 支出サマリーカード */}
      <View style={styles.summary}>
        <Card style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>月間支出の推移</Text>
            <View style={styles.trendContainer}>
              <Text style={styles.totalAmount}>
                ¥{monthlyData.total.toLocaleString()}
              </Text>
              <View style={styles.trendIndicator}>
                <MaterialCommunityIcons
                  name={
                    monthlyData.percentageChange < 0 ? 'arrow-down' : 'arrow-up'
                  }
                  size={24}
                  color={
                    monthlyData.percentageChange < 0 ? '#4CAF50' : '#FF4444'
                  }
                />
                <Text
                  style={[
                    styles.percentageText,
                    {
                      color:
                        monthlyData.percentageChange < 0 ? '#4CAF50' : '#FF4444'
                    }
                  ]}
                >
                  {monthlyData.percentageChange.toFixed(1)}%
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.lastMonthText}>
            先月: ¥{monthlyData.lastMonthTotal.toLocaleString()}
          </Text>
        </Card>

        <Card style={styles.summaryCard}>
          <Text style={styles.cardTitle}>1日あたりの平均</Text>
          <Text style={styles.amount}>
            ¥{monthlyData.averagePerDay.toLocaleString()}
          </Text>
          <Text style={styles.budgetText}>
            目標: ¥{monthlyData.dailyBudget.toLocaleString()}/日
          </Text>
        </Card>
      </View>

      {/* カテゴリー別支出 */}
      <Card style={styles.categoryCard}>
        <Text style={styles.cardTitle}>カテゴリー別支出</Text>
        <View style={styles.categoryList}>
          {Object.entries(categorySummaries)
            .sort(([, a], [, b]) => b.total - a.total)
            .map(([category, summary]) => (
              <View key={category} style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name={categoryIcons[category]}
                    size={20}
                    color="#666"
                  />
                </View>
                <View style={styles.categoryContent}>
                  <View style={styles.categoryHeader}>
                    <Text style={styles.categoryLabel}>
                      {categoryLabels[category]}
                    </Text>
                    <Text style={styles.categoryAmount}>
                      ¥{summary.total.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${summary.percentage}%` }
                      ]}
                    />
                  </View>
                </View>
              </View>
            ))}
        </View>
      </Card>
    </View>
  )
}
