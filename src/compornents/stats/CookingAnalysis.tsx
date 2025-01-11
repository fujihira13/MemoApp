import React, { useMemo, useState } from 'react'
import { View, Text } from 'react-native'
import { Card } from '../common/Card'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from '../../styles/components/stats/CookingAnalysis.styles'
import { useExpenseStorage } from '../../hooks/useExpenseStorage'
import { MealTime } from '../../types/expense'

interface CookingAnalysisProps {
  selectedMonth: Date
}

/**
 * CookingAnalysisコンポーネント
 * 選択された月の自炊分析を表示する
 * @param {CookingAnalysisProps} props コンポーネントのプロパティ
 * @returns {React.JSX.Element} 自炊分析のJSX要素
 */
export const CookingAnalysis = ({
  selectedMonth
}: CookingAnalysisProps): React.JSX.Element => {
  const { expenses, loading } = useExpenseStorage()

  // 選択された月の自炊データを計算（メモ化）
  const cookingStats = useMemo(() => {
    if (loading) return null

    const currentMonth = selectedMonth.getMonth()
    const currentYear = selectedMonth.getFullYear()

    // 選択された月の自炊データをフィルタリング
    const selectedMonthCooking = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return (
        expense.isHomeCooking &&
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      )
    })

    // 時間帯別の集計
    const mealTimeBreakdown = selectedMonthCooking.reduce(
      (acc, expense) => {
        if (expense.mealTime !== 'none' && expense.mealTime !== 'snack') {
          acc[expense.mealTime] = (acc[expense.mealTime] ?? 0) + 1
        }
        return acc
      },
      { breakfast: 0, lunch: 0, dinner: 0 } as Record<MealTime, number>
    )

    // 自炊による推定節約額を計算（1食あたり1000円で計算）
    const estimatedSaving = selectedMonthCooking.length * 1000

    return {
      monthlyCount: selectedMonthCooking.length,
      estimatedSaving,
      mealTimeBreakdown
    }
  }, [expenses, loading, selectedMonth])

  if (loading || !cookingStats) {
    return (
      <View style={styles.container}>
        <Text>読み込み中...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* 自炊回数 */}
      <Card style={styles.statsCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>今月の自炊回数</Text>
          <MaterialCommunityIcons name="pot-steam" size={20} color="#666" />
        </View>
        <Text style={styles.statValue}>{cookingStats.monthlyCount}回</Text>
      </Card>

      {/* 推定節約額 */}
      <Card style={styles.statsCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>推定節約額</Text>
          <MaterialCommunityIcons name="piggy-bank" size={20} color="#666" />
        </View>
        <Text style={styles.statValue}>
          ¥{cookingStats.estimatedSaving.toLocaleString()}
        </Text>
        <Text style={styles.subText}>1食あたり約1,000円で計算</Text>
      </Card>

      {/* 時間帯別自炊回数 */}
      <Card style={styles.breakdownCard}>
        <Text style={styles.cardTitle}>時間帯別自炊回数</Text>
        <View style={styles.mealTimeList}>
          {Object.entries(cookingStats.mealTimeBreakdown).map(
            ([mealTime, count]) => (
              <View key={mealTime} style={styles.mealTimeItem}>
                <View style={styles.mealTimeHeader}>
                  <Text style={styles.mealTimeLabel}>
                    {mealTime === 'breakfast'
                      ? '朝食'
                      : mealTime === 'lunch'
                      ? '昼食'
                      : '夕食'}
                  </Text>
                  <Text style={styles.mealTimeCount}>{count}回</Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(count / cookingStats.monthlyCount) * 100}%`
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
