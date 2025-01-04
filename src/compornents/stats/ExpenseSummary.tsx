import React from 'react'
import { View, Text } from 'react-native'
import { Card } from '../common/Card'
import { styles } from '../../styles/components/stats/ExpenseSummary.styles'
import { CategorySummaries, Expense } from '../../types/expense'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface ExpenseSummaryProps {
  expenses: Expense[]
  selectedMonth: Date
}

export const ExpenseSummary = ({
  expenses,
  selectedMonth
}: ExpenseSummaryProps): React.JSX.Element => {
  // カテゴリー別の集計を計算
  const calculateCategorySummaries = (): CategorySummaries => {
    const summaries: CategorySummaries = {}
    let grandTotal = 0

    // 各支出をカテゴリー別に集計
    expenses.forEach((expense) => {
      if (!expense.isHomeCooking) {
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
  }

  const categorySummaries = calculateCategorySummaries()

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

  // カテゴリーアイコンのマッピング
  const categoryIcons: { [key: string]: string } = {
    grocery: 'cart',
    eating_out: 'silverware-fork-knife',
    snack: 'cookie',
    drinking: 'glass-wine',
    convenience: 'store',
    home_cooking: 'pot-steam',
    other: 'dots-horizontal'
  }

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>
        {selectedMonth.toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: 'long'
        })}
        の支出分析
      </Text>

      {Object.entries(categorySummaries)
        .sort(([, a], [, b]) => b.total - a.total)
        .map(([category, summary]) => (
          <View key={category} style={styles.categoryRow}>
            <View style={styles.categoryInfo}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name={categoryIcons[category]}
                  size={24}
                  color="#666"
                />
              </View>
              <View>
                <Text style={styles.categoryName}>
                  {categoryLabels[category]}
                </Text>
                <Text style={styles.categoryCount}>
                  {summary.count}件の支出
                </Text>
              </View>
            </View>
            <View style={styles.amountInfo}>
              <Text style={styles.amount}>
                ¥{summary.total.toLocaleString()}
              </Text>
              <Text style={styles.percentage}>
                {summary.percentage.toFixed(1)}%
              </Text>
            </View>
          </View>
        ))}
    </Card>
  )
}
