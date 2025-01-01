import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card } from '../common/Card'
import { ExpenseItem } from '../../types/expense'

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
const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16
  },
  header: {
    marginBottom: 16
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4
  },
  headerCell: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500'
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  cell: {
    fontSize: 12
  },
  dateCell: {
    width: '15%'
  },
  mealTimeCell: {
    width: '15%'
  },
  categoryCell: {
    width: '20%'
  },
  amountCell: {
    width: '20%'
  },
  noteCell: {
    flex: 1
  }
})
