import React, { useState, useMemo } from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { Card } from '../common/Card'
import { styles } from '../../styles/components/stats/DailyReport.styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import { useExpenseStorage } from '../../hooks/useExpenseStorage'

export const DailyReport = (): React.JSX.Element => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const { expenses, loading } = useExpenseStorage()

  // 選択された日付の支出データを計算
  const dailyData = useMemo(() => {
    if (loading) return null

    // 選択された日付の支出をフィルタリング
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return (
        expenseDate.getDate() === selectedDate.getDate() &&
        expenseDate.getMonth() === selectedDate.getMonth() &&
        expenseDate.getFullYear() === selectedDate.getFullYear() &&
        !expense.isHomeCooking // 自炊は除外
      )
    })

    // 時間帯別に集計
    const data = filteredExpenses.reduce(
      (acc, expense) => {
        if (expense.mealTime !== 'none') {
          acc[expense.mealTime].amount += expense.amount
        }
        return acc
      },
      {
        breakfast: { amount: 0 },
        lunch: { amount: 0 },
        dinner: { amount: 0 },
        snack: { amount: 0 }
      }
    )

    return data
  }, [expenses, loading, selectedDate])

  // 日付選択の処理
  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ): void => {
    setShowDatePicker(false)
    if (selectedDate) {
      setSelectedDate(selectedDate)
    }
  }

  if (loading || !dailyData) {
    return (
      <View style={styles.container}>
        <Text>読み込み中...</Text>
      </View>
    )
  }

  const totalDaily = Object.values(dailyData).reduce(
    (sum, { amount }) => sum + amount,
    0
  )

  return (
    <View style={styles.container}>
      {/* 日付選択カード */}
      <Card style={styles.dateCard}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <MaterialCommunityIcons name="calendar" size={24} color="#666" />
          <Text style={styles.dateText}>
            {selectedDate.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </TouchableOpacity>
      </Card>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
          locale="ja"
        />
      )}

      {/* 時間帯別支出カード */}
      <Card style={styles.expenseCard}>
        <Text style={styles.cardTitle}>時間帯別支出</Text>
        <View style={styles.expenseList}>
          {Object.entries(dailyData).map(([mealTime, data]) => (
            <View key={mealTime} style={styles.expenseItem}>
              <View style={styles.expenseHeader}>
                <Text style={styles.mealTimeText}>
                  {mealTime === 'breakfast'
                    ? '朝食'
                    : mealTime === 'lunch'
                    ? '昼食'
                    : mealTime === 'dinner'
                    ? '夕食'
                    : '間食'}
                </Text>
                <Text style={styles.amountText}>
                  ¥{data.amount.toLocaleString()}
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width:
                        totalDaily > 0
                          ? `${(data.amount / totalDaily) * 100}%`
                          : '0%'
                    }
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
        {/* 合計 */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>合計</Text>
          <Text style={styles.totalAmount}>¥{totalDaily.toLocaleString()}</Text>
        </View>
      </Card>
    </View>
  )
}
