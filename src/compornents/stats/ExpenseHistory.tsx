import React from 'react'
import { View, Text } from 'react-native'
import { Card } from '../common/Card'
import { Expense } from '../../types/expense'
import { styles } from '../../styles/components/stats/ExpenseHistory.styles'
import { useExpenseStorage } from '../../hooks/useExpenseStorage'

export const ExpenseHistory = (): React.JSX.Element => {
  const { expenses, loading } = useExpenseStorage()

  if (loading) {
    return <Text>読み込み中...</Text>
  }

  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date

    return dateObj.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>支出履歴</Text>
        <Text style={styles.subtitle}>2024年1月</Text>
      </View>

      {/* テーブルヘッダー */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.dateCell]}>日付</Text>
        <Text style={[styles.headerCell, styles.mealTimeCell]}>時間帯</Text>
        <Text style={[styles.headerCell, styles.categoryCell]}>カテゴリー</Text>
        <Text style={[styles.headerCell, styles.amountCell]}>金額</Text>
        <Text style={[styles.headerCell, styles.noteCell]}>メモ</Text>
      </View>

      {/* 支出リスト */}
      {expenses.map((expense, index) => (
        <View key={index} style={styles.row}>
          <Text style={[styles.cell, styles.dateCell]}>
            {expense.date ? formatDate(expense.date) : '日付なし'}
          </Text>
          <Text style={[styles.cell, styles.mealTimeCell]}>
            {expense.mealTime}
          </Text>
          <Text style={[styles.cell, styles.categoryCell]}>
            {expense.category}
          </Text>
          <Text style={[styles.cell, styles.amountCell]}>
            {expense.isHomeCooking
              ? '-'
              : `¥${expense.amount.toLocaleString()}`}
          </Text>
          <Text style={[styles.cell, styles.noteCell]}>{expense.note}</Text>
        </View>
      ))}
    </Card>
  )
}
