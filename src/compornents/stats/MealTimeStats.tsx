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
      dinner: { amount: 0, count: 0, average: 0 }
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
    <View style={styles.container}>
      {/* 朝食の統計 */}
      <Card style={styles.statsCard}>
        <Text style={styles.mealLabel}>朝食</Text>
        <Text style={styles.amount}>
          ¥{statsData.breakfast.amount.toLocaleString()}
        </Text>
        <Text style={styles.averageText}>
          1日平均: ¥{statsData.breakfast.average.toLocaleString()}
        </Text>
      </Card>

      {/* 昼食の統計 */}
      <Card style={styles.statsCard}>
        <Text style={styles.mealLabel}>昼食</Text>
        <Text style={styles.amount}>
          ¥{statsData.lunch.amount.toLocaleString()}
        </Text>
        <Text style={styles.averageText}>
          1日平均: ¥{statsData.lunch.average.toLocaleString()}
        </Text>
      </Card>

      {/* 夕食の統計 */}
      <Card style={styles.statsCard}>
        <Text style={styles.mealLabel}>夕食</Text>
        <Text style={styles.amount}>
          ¥{statsData.dinner.amount.toLocaleString()}
        </Text>
        <Text style={styles.averageText}>
          1日平均: ¥{statsData.dinner.average.toLocaleString()}
        </Text>
      </Card>

      {/* 時間帯別支出比較グラフ */}
      <Card style={styles.comparisonCard}>
        <Text style={styles.cardTitle}>時間帯別支出比較</Text>
        <View style={styles.progressContainer}>
          {Object.entries(statsData).map(
            ([meal, data]: [string, MealTimeData]) => (
              <View key={meal} style={styles.progressItem}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>
                    {meal === 'breakfast'
                      ? '朝食'
                      : meal === 'lunch'
                      ? '昼食'
                      : '夕食'}
                  </Text>
                  <Text style={styles.progressAmount}>
                    ¥{data.amount.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(data.amount / maxAmount) * 100}%`
                      }
                    ]}
                  />
                </View>
              </View>
            )
          )}
        </View>
      </Card>
    </View>
  )
}
