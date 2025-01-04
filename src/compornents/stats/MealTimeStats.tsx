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

const mealTimeLabels: { [key: string]: string } = {
  breakfast: '朝食',
  lunch: '昼食',
  dinner: '夕食',
  snack: '間食'
}

interface MealTimeStatsProps {
  selectedDate: Date
}

export const MealTimeStats = ({
  selectedDate
}: MealTimeStatsProps): React.JSX.Element => {
  const { expenses, loading } = useExpenseStorage()

  const statsData: StatsData | null = useMemo(() => {
    if (loading) return null

    const currentMonth = selectedDate.getMonth()
    const currentYear = selectedDate.getFullYear()

    // 選択された日付の支出をフィルタリング
    const currentDayExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return (
        expenseDate.getDate() === selectedDate.getDate() &&
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear &&
        !expense.isHomeCooking
      )
    })

    const initialData: StatsData = {
      breakfast: { amount: 0, count: 0, average: 0 },
      lunch: { amount: 0, count: 0, average: 0 },
      dinner: { amount: 0, count: 0, average: 0 },
      snack: { amount: 0, count: 0, average: 0 }
    }

    // データの集計
    const data: StatsData = currentDayExpenses.reduce(
      (acc: StatsData, expense) => {
        const mealTime = expense.mealTime as keyof StatsData
        acc[mealTime].amount += expense.amount
        acc[mealTime].count++
        return acc
      },
      initialData
    )

    // 平均を計算
    Object.keys(data).forEach((mealTime) => {
      const key = mealTime as keyof StatsData
      data[key].average =
        data[key].count > 0 ? Math.round(data[key].amount / data[key].count) : 0
    })

    return data
  }, [expenses, loading, selectedDate])

  if (loading || !statsData) {
    return (
      <View style={styles.container}>
        <Text>読み込み中...</Text>
      </View>
    )
  }

  // 総支出を計算
  const totalAmount = Object.values(statsData).reduce(
    (sum, data) => sum + data.amount,
    0
  )

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>時間帯別支出比較</Text>
      {Object.entries(statsData).map(([mealTime, data]) => {
        const mealTimeKey = mealTime as keyof StatsData
        const barWidth = totalAmount > 0 ? (data.amount / totalAmount) * 100 : 0

        return (
          <View key={mealTimeKey} style={styles.statRow}>
            <View style={styles.headerContainer}>
              <Text style={styles.mealTimeLabel}>
                {mealTimeLabels[mealTimeKey]}
              </Text>
              <View style={styles.statInfo}>
                <Text style={styles.amount}>
                  ¥{data.amount.toLocaleString()}
                </Text>
                <Text style={styles.average}>
                  平均: ¥{data.average.toLocaleString()}/食
                </Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${barWidth}%` }]} />
            </View>
          </View>
        )
      })}
    </Card>
  )
}
