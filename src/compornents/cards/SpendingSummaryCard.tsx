// src/components/cards/SpendingSummaryCard.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../../styles/components/cards/SpendingSummaryCard.styles'
import { useBudgetStorage } from '../../hooks/useBudgetStorage'

interface SpendingSummaryCardProps {
  data: {
    totalExpense: number
    wasteExpense: number
    monthlyBudget: number
  }
  selectedMonth: Date
}

export const SpendingSummaryCard = ({
  data,
  selectedMonth
}: SpendingSummaryCardProps): React.JSX.Element => {
  const { budgetSettings } = useBudgetStorage()
  const monthlyBudget = budgetSettings?.monthlyBudget || 0

  return (
    <View style={styles.container}>
      {/* 総支出カード */}
      <View style={styles.card}>
        <Text style={styles.label}>今月の総支出</Text>
        <Text style={styles.amount}>¥{data.totalExpense.toLocaleString()}</Text>

        {/* 月間予算を表示 */}
        {monthlyBudget ? (
          <Text style={styles.budgetText}>
            月間予算: ¥{monthlyBudget.toLocaleString()}
          </Text>
        ) : (
          <Text style={styles.budgetText}>月間予算が設定されていません</Text>
        )}
      </View>

      {/* 浪費カード */}
      <View style={styles.card}>
        <Text style={styles.label}>今月の浪費</Text>
        <Text style={[styles.amount, styles.wasteAmount]}>
          ¥{data.wasteExpense.toLocaleString()}
        </Text>
        <Text style={styles.subText}>外食・間食・飲み会・コンビニ</Text>
      </View>
    </View>
  )
}
