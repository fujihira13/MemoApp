import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert, Modal } from 'react-native'
import { Card } from '../common/Card'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from '../../styles/components/stats/ExpenseHistory.styles'
import { useExpenseStorage } from '../../hooks/useExpenseStorage'
import { Expense, CategorySummaries } from '../../types/expense'
import { ExpenseSummary } from './ExpenseSummary'

// カテゴリーの日本語マッピング
const categoryLabels: { [key: string]: string } = {
  grocery: 'スーパー',
  eating_out: '外食',
  snack: '間食',
  drinking: '飲み会',
  convenience: 'コンビニ',
  home_cooking: '自炊',
  other: 'その他'
}

// 時間帯の日本語マッピング
const mealTimeLabels: { [key: string]: string } = {
  breakfast: '朝食',
  lunch: '昼食',
  dinner: '夕食',
  snack: '間食',
  none: 'なし'
}

// 編集モーダルを別のコンポーネントに分割
const ExpenseEditModal = ({
  expense,
  visible,
  onClose,
  onSave
}: {
  expense: Expense | null
  visible: boolean
  onClose: () => void
  onSave: (updatedExpense: Expense) => void
}): React.JSX.Element => {
  const [formData, setFormData] = useState<Expense | null>(null)

  useEffect(() => {
    if (expense) {
      setFormData({ ...expense, mealTime: expense.mealTime || 'none' })
    }
  }, [expense])

  const handleSave = (): void => {
    if (formData) {
      const updatedExpense: Expense = {
        ...formData,
        amount: Number(formData.amount.toString()),
        date: new Date(formData.date).toISOString(),
        mealTime: formData.mealTime
      }
      onSave(updatedExpense)
      onClose()
    }
  }

  if (!formData) return <></>

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* ... */}
    </Modal>
  )
}

export const ExpenseHistory = (): React.JSX.Element => {
  const { expenses, loading, deleteExpense, editExpense, subscribe } =
    useExpenseStorage()
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [updateTrigger, setUpdateTrigger] = useState(0)

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setUpdateTrigger((prev) => prev + 1)
    })
    return (): void => {
      unsubscribe()
    }
  }, [subscribe])

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

  // 月間合計の計算から自炊を除外
  const monthlyTotal = filteredExpenses
    .filter((expense) => !expense.isHomeCooking)
    .reduce((sum, expense) => sum + expense.amount, 0)

  // 編集ハンドラーを別の関数に抽出
  const openEditModal = (expense: Expense): void => {
    setSelectedExpense(expense)
    setIsEditModalVisible(true)
  }

  const closeEditModal = (): void => {
    setIsEditModalVisible(false)
  }

  const saveEditedExpense = async (updatedExpense: Expense): Promise<void> => {
    try {
      await editExpense(updatedExpense)
      Alert.alert('成功', '支出記録を更新しました')
    } catch (error) {
      console.error('更新エラー:', error)
      Alert.alert('エラー', '支出記録の更新に失敗しました')
    }
  }

  // 削除ハンドラーを別の関数に抽出
  const confirmDelete = (expenseId: string): void => {
    Alert.alert('削除の確認', 'この支出記録を削除してもよろしいですか？', [
      {
        text: 'キャンセル',
        style: 'cancel'
      },
      {
        text: '削除',
        style: 'destructive',
        onPress: (): void => {
          void deleteExpenseRecord(expenseId)
        }
      }
    ])
  }

  const deleteExpenseRecord = async (expenseId: string): Promise<void> => {
    try {
      await deleteExpense(expenseId)
      Alert.alert('成功', '支出記録を削除しました')
    } catch (error) {
      console.error('削除エラー:', error)
      Alert.alert('エラー', '支出記録の削除に失敗しました')
    }
  }

  if (loading) {
    return <Text>読み込み中...</Text>
  }

  return (
    <View style={styles.pageContainer}>
      <ExpenseSummary selectedMonth={selectedMonth} key={updateTrigger} />
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
          <Text style={[styles.headerCell, styles.categoryCell]}>
            カテゴリー
          </Text>
          <Text style={[styles.headerCell, styles.amountCell]}>金額</Text>
          {/* <Text style={[styles.headerCell, styles.noteCell]}>メモ</Text> */}
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
                {mealTimeLabels[expense.mealTime]}
              </Text>
              <Text style={[styles.cell, styles.categoryCell]}>
                {categoryLabels[expense.category]}
              </Text>
              <Text style={[styles.cell, styles.amountCell]}>
                ¥{expense.amount.toLocaleString()}
              </Text>
              <View style={[styles.cell, styles.actionCell]}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => openEditModal(expense)}
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color="#2196F3"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => confirmDelete(expense.id)}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    color="#FF4444"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </Card>

      <ExpenseEditModal
        expense={selectedExpense}
        visible={isEditModalVisible}
        onClose={closeEditModal}
        onSave={(expense: Expense): void => {
          void saveEditedExpense(expense)
        }}
      />
    </View>
  )
}
