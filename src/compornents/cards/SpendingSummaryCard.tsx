// src/components/cards/SpendingSummaryCard.tsx
import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import { styles } from '../../styles/components/cards/SpendingSummaryCard.styles'
import { useBudgetStorage } from '../../hooks/useBudgetStorage'
import { useExpenseStorage } from '../../hooks/useExpenseStorage' // 追加

// Props型の簡略化
interface SpendingSummaryCardProps {
  selectedMonth: Date
}

export const SpendingSummaryCard = ({
  selectedMonth
}: SpendingSummaryCardProps): React.JSX.Element => {
  // フックの追加
  const { expenses, loading } = useExpenseStorage()
  const { budgetSettings } = useBudgetStorage()
  const monthlyBudget = budgetSettings?.monthlyBudget || 0

  // データ計算ロジックをコンポーネント内に移動
  const calculatedData = useMemo(() => {
    if (loading) {
      return {
        totalExpense: 0,
        wasteExpense: 0
      }
    }

    // 当月のデータをフィルタリング
    const currentMonthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return (
        expenseDate.getMonth() === selectedMonth.getMonth() &&
        expenseDate.getFullYear() === selectedMonth.getFullYear()
      )
    })

    // 総支出の計算
    const totalExpense = currentMonthExpenses.reduce(
      (sum, expense) => sum + (expense.isHomeCooking ? 0 : expense.amount),
      0
    )

    // 浪費の計算
    const wasteCategories = ['eating_out', 'snack', 'drinking', 'convenience']
    const wasteExpense = currentMonthExpenses.reduce((sum, expense) => {
      if (
        wasteCategories.includes(expense.category) &&
        !expense.isHomeCooking
      ) {
        return sum + expense.amount
      }
      return sum
    }, 0)

    return {
      totalExpense,
      wasteExpense
    }
  }, [expenses, loading, selectedMonth])

  return (
    <View style={styles.container}>
      {/* 総支出カード */}
      <View style={styles.card}>
        <Text style={styles.label}>今月の総支出</Text>
        <Text style={styles.amount}>
          ¥{calculatedData.totalExpense.toLocaleString()}
        </Text>

        {/* 月間予算をコメントアウト */}
        {/* {monthlyBudget ? (
          <Text style={styles.budgetText}>
            月間予算: ¥{monthlyBudget.toLocaleString()}
          </Text>
        ) : (
          <Text style={styles.budgetText}>月間予算が設定されていません</Text>
        )} */}
      </View>

      {/* 浪費カード */}
      <View style={styles.card}>
        <Text style={styles.label}>今月の浪費</Text>
        <Text style={[styles.amount, styles.wasteAmount]}>
          ¥{calculatedData.wasteExpense.toLocaleString()}
        </Text>
        <Text style={styles.subText}>外食・間食・飲み会・コンビニ</Text>
      </View>
    </View>
  )
}
