import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { Card } from '../common/Card'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from '../../styles/components/stats/ExpenseHistory.styles'
import { useExpenseStorage } from '../../hooks/useExpenseStorage'
import { ExpenseEditModal } from '../modals/ExpenseEditModal'
import { Expense } from '../../types/expense'

export const ExpenseHistory = (): React.JSX.Element => {
  const { expenses, loading, deleteExpense, editExpense } = useExpenseStorage()
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  // 月を変更する関数
  const changeMonth = (increment: number): void => {
    const newDate = new Date(selectedMonth)
    newDate.setMonth(newDate.getMonth() + increment)
    setSelectedMonth(newDate)
  }

  // 月別にフィルタリングされた支出を取得
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return (
      expenseDate.getMonth() === selectedMonth.getMonth() &&
      expenseDate.getFullYear() === selectedMonth.getFullYear()
    )
  })

  // 月の合計金額を計算
  const monthlyTotal = filteredExpenses.reduce((total, expense) => {
    return total + (expense.isHomeCooking ? 0 : expense.amount)
  }, 0)

  // 編集ハンドラー
  const handleEdit = (expense: Expense): void => {
    setSelectedExpense(expense)
    setIsEditModalVisible(true)
  }

  // 削除ハンドラー
  const handleDelete = (expenseId: string): void => {
    Alert.alert('削除の確認', 'この支出記録を削除してもよろしいですか？', [
      {
        text: 'キャンセル',
        style: 'cancel'
      },
      {
        text: '削除',
        style: 'destructive',
        onPress: (): void => {
          void (async (): Promise<void> => {
            try {
              await deleteExpense(expenseId)
              Alert.alert('成功', '支出記録を削除しました')
            } catch (error) {
              console.error('削除エラー:', error)
              Alert.alert('エラー', '支出記録の削除に失敗しました')
            }
          })()
        }
      }
    ])
  }

  if (loading) {
    return <Text>読み込み中...</Text>
  }

  return (
    <Card style={styles.container}>
      {/* 月選択ヘッダー */}
      <View style={styles.header}>
        <View style={styles.monthSelector}>
          <TouchableOpacity
            onPress={() => changeMonth(-1)}
            style={styles.monthButton}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color="#666"
            />
          </TouchableOpacity>

          <Text style={styles.monthText}>
            {selectedMonth.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long'
            })}
          </Text>

          <TouchableOpacity
            onPress={() => changeMonth(1)}
            style={styles.monthButton}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* 月間合計 */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>月間合計</Text>
          <Text style={styles.totalAmount}>
            ¥{monthlyTotal.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* テーブルヘッダー */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.dateCell]}>日付</Text>
        <Text style={[styles.headerCell, styles.mealTimeCell]}>時間帯</Text>
        <Text style={[styles.headerCell, styles.categoryCell]}>カテゴリー</Text>
        <Text style={[styles.headerCell, styles.amountCell]}>金額</Text>
        <Text style={[styles.headerCell, styles.noteCell]}>メモ</Text>
        <Text style={[styles.headerCell, styles.actionCell]}>操作</Text>
      </View>

      {/* 支出リスト */}
      {filteredExpenses.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            この月の支出記録はありません
          </Text>
        </View>
      ) : (
        filteredExpenses.map((expense) => (
          <View key={expense.id} style={styles.row}>
            <Text style={[styles.cell, styles.dateCell]}>
              {new Date(expense.date).toLocaleDateString('ja-JP')}
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
            <View style={[styles.cell, styles.actionCell]}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(expense)}
              >
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={20}
                  color="#2196F3"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => void handleDelete(expense.id)}
              >
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={20}
                  color="#ff4444"
                />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* 編集モーダル */}
      <ExpenseEditModal
        visible={isEditModalVisible}
        expense={selectedExpense}
        onClose={() => {
          setIsEditModalVisible(false)
          setSelectedExpense(null)
        }}
        onSave={async (updatedExpense: Expense): Promise<void> => {
          try {
            await editExpense(updatedExpense)
            setIsEditModalVisible(false)
            setSelectedExpense(null)
          } catch (error) {
            console.error('編集エラー:', error)
            Alert.alert('エラー', '支出の編集に失敗しました')
          }
        }}
      />
    </Card>
  )
}
