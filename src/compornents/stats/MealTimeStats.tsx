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

const mealTimeLabels: Record<keyof StatsData, string> = {
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

  const statsData: StatsData = useMemo(() => {
    if (loading) {
      console.log('Loading...')
      return {
        breakfast: { amount: 0, count: 0, average: 0 },
        lunch: { amount: 0, count: 0, average: 0 },
        dinner: { amount: 0, count: 0, average: 0 },
        snack: { amount: 0, count: 0, average: 0 }
      }
    }

    // フィルタリング前の支出データを確認
    console.log('All expenses:', expenses)

    const currentMonth = selectedDate.getMonth()
    const currentYear = selectedDate.getFullYear()

    const currentDayExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      const isMatch =
        expenseDate.getDate() === selectedDate.getDate() &&
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear &&
        !expense.isHomeCooking
      return isMatch
    })

    // フィルタリング後の支出データを確認
    console.log('Filtered expenses:', currentDayExpenses)
    console.log('Selected date:', selectedDate)

    // 初期データ構造
    const initialData: StatsData = {
      breakfast: { amount: 0, count: 0, average: 0 },
      lunch: { amount: 0, count: 0, average: 0 },
      dinner: { amount: 0, count: 0, average: 0 },
      snack: { amount: 0, count: 0, average: 0 }
    }

    // データの集計
    return currentDayExpenses.reduce((acc: StatsData, expense) => {
      console.log('Processing expense:', expense)
      console.log('Current mealTime:', expense.mealTime)

      const mealTime = expense.mealTime as keyof StatsData

      console.log('Mapped mealTime:', mealTime)

      if (acc[mealTime]) {
        acc[mealTime].amount += expense.amount
        acc[mealTime].count++
        acc[mealTime].average = Math.round(
          acc[mealTime].amount / acc[mealTime].count
        )
      } else if (expense.mealTime === 'none') {
        // 'none' の場合は何もしない
      } else {
        // 未知の mealTime の場合はエラーを throw するなどの処理を行う
        console.error('Unknown mealTime:', expense.mealTime)
      }
      return acc
    }, initialData)
  }, [expenses, loading, selectedDate])

  // 最終的なstatsDataの値を確認
  console.log('Final statsData:', statsData)

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>読み込み中...</Text>
      </View>
    )
  }

  // 総支出を計算
  const totalAmount = (
    Object.values(statsData) as MealTimeData[]
  ).reduce<number>((sum, data) => sum + data.amount, 0)

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>時間帯別支出比較</Text>
      {Object.entries(statsData).map(([mealTime, data]) => {
        console.log('Rendering mealTime:', mealTime, 'data:', data)
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
