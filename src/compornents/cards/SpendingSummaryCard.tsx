// src/components/cards/SpendingSummaryCard.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../../styles/components/cards/SpendingSummaryCard.styles'
interface SpendingSummaryCardProps {
  data: {
    totalExpense: number
    wasteExpense: number
  }
  selectedMonth: Date
}

export const SpendingSummaryCard = ({
  data,
  selectedMonth
}: SpendingSummaryCardProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      {/* 総支出カード */}
      <View style={styles.card}>
        <Text style={styles.label}>今月の総支出</Text>
        <Text style={styles.amount}>¥{data.totalExpense.toLocaleString()}</Text>
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
