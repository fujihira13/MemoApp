import React from 'react'
import { View, Text } from 'react-native'
import { Card } from '../common/Card'
import { ExpenseItem } from '../../types/expense'
import { styles } from '../../styles/components/stats/ExpenseHistory.styles'
export const ExpenseHistory = (): React.JSX.Element => {
  // サンプルデータ
  const expenses: ExpenseItem[] = [
    {
      id: '1',
      date: '01/01',
      mealTime: '夕食',
      category: 'スーパー',
      amount: 2500,
      note: '週末の食材'
    },
    {
      id: '2',
      date: '01/01',
      mealTime: '昼食',
      category: '自炊',
      amount: 0,
      note: 'お弁当持参',
      isHomeCooking: true
    }
  ]

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
      {expenses.map((expense) => (
        <View key={expense.id} style={styles.row}>
          <Text style={[styles.cell, styles.dateCell]}>{expense.date}</Text>
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
