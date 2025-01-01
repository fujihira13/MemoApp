// src/components/cards/SpendingSummaryCard.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface SpendingSummaryCardProps {
  data: {
    totalExpense: number
    wasteExpense: number
  }
}

export const SpendingSummaryCard = ({
  data
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  wasteAmount: {
    color: '#ff4444'
  },
  subText: {
    fontSize: 10,
    color: '#666',
    marginTop: 4
  }
})
