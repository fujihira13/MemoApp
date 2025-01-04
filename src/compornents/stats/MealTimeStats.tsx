import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import { Card } from '../common/Card'
import { styles } from '../../styles/components/stats/MealTimeStats.styles'
import { useExpenseStorage } from '../../hooks/useExpenseStorage'

interface MealTimeData {
  amount: number
  count: number
  average: number
}

interface StatsData {
  breakfast: MealTimeData
  lunch: MealTimeData
  dinner: MealTimeData
  snack: MealTimeData
}

// 時間帯の日本語マッピング
const mealTimeLabels: { [key: string]: string } = {
  breakfast: '朝食',
  lunch: '昼食',
  dinner: '夕食',
  snack: '間食'
}

export const MealTimeStats = (): React.JSX.Element => {
  const { expenses, loading } = useExpenseStorage()

  // 時間帯別の統計データを計算（メモ化）
  const statsData = useMemo(() => {
    if (loading) return null

    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    // 今月の支出をフィルタリング
    const currentMonthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear &&
        !expense.isHomeCooking // 自炊は除外
      )
    })

    // 月の日数を取得
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    // 初期データ構造
    const initialData: StatsData = {
      breakfast: { amount: 0, count: 0, average: 0 },
      lunch: { amount: 0, count: 0, average: 0 },
      dinner: { amount: 0, count: 0, average: 0 },
      snack: { amount: 0, count: 0, average: 0 }
    }

    // データの集計
    const data = currentMonthExpenses.reduce((acc, expense) => {
      const mealTime = expense.mealTime as keyof StatsData
      acc[mealTime].amount += expense.amount
      acc[mealTime].count++
      return acc
    }, initialData)

    // 平均を計算
    Object.keys(data).forEach((mealTime) => {
      const key = mealTime as keyof StatsData
      data[key].average =
        data[key].count > 0 ? Math.round(data[key].amount / daysInMonth) : 0
    })

    return data
  }, [expenses, loading])

  if (loading || !statsData) {
    return (
      <View style={styles.container}>
        <Text>読み込み中...</Text>
      </View>
    )
  }

  // 最大支出額を取得（プログレスバーの計算用）
  const maxAmount = Math.max(
    statsData.breakfast.amount,
    statsData.lunch.amount,
    statsData.dinner.amount
  )

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>時間帯別支出比較</Text>
      {Object.entries(statsData || {}).map(([mealTime, data]) => (
        <View key={mealTime} style={styles.statRow}>
          <View style={styles.headerContainer}>
            <Text style={styles.mealTimeLabel}>
              {mealTimeLabels[mealTime as keyof typeof mealTimeLabels]}
            </Text>
            <View style={styles.statInfo}>
              <Text style={styles.amount}>¥{data.amount.toLocaleString()}</Text>
              <Text style={styles.average}>
                平均: ¥{data.average.toLocaleString()}/日
              </Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    statsData
                      ? (data.amount /
                          Object.values(statsData).reduce(
                            (sum, stat) => sum + stat.amount,
                            0
                          )) *
                        100
                      : 0
                  }%`
                }
              ]}
            />
          </View>
        </View>
      ))}
    </Card>
  )
}
