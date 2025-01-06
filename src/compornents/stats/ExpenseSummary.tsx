import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import { Card } from '../common/Card'
import { styles } from '../../styles/components/stats/ExpenseSummary.styles'
import { CategorySummaries, Expense } from '../../types/expense'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useExpenseStorage } from '../../hooks/useExpenseStorage'

interface ExpenseSummaryProps {
  selectedMonth: Date
}

export const ExpenseSummary = ({
  selectedMonth
}: ExpenseSummaryProps): React.JSX.Element => {
  const { expenses, loading } = useExpenseStorage()

  const categorySummaries = useMemo(() => {
    if (loading) return {}

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

    Object.keys(summaries).forEach((category) => {
      summaries[category].percentage =
        (summaries[category].total / grandTotal) * 100
    })

    return summaries
  }, [expenses, loading, selectedMonth])

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>読み込み中...</Text>
      </View>
    )
  }

  // カテゴリー名の日本語マッピング
  const categoryLabels: { [key: string]: string } = {
    grocery: 'スーパー',
    eating_out: '外食',
    snack: '間食',
    drinking: '飲み会',
    convenience: 'コンビニ',
    other: 'その他'
  }

  // カテゴリーアイコンのマッピング
  const categoryIcons: {
    [key: string]: keyof typeof MaterialCommunityIcons.glyphMap
  } = {
    grocery: 'cart',
    eating_out: 'silverware-fork-knife',
    snack: 'cookie',
    drinking: 'glass-wine',
    convenience: 'store',
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
