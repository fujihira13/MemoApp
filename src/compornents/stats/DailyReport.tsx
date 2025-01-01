import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native'
import { Card } from '../common/Card'
import DateTimePicker from '@react-native-community/datetimepicker'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'

export const DailyReport = (): React.JSX.Element => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  // サンプルデータ
  const dailyData = {
    breakfast: { amount: 800 },
    lunch: { amount: 1200 },
    dinner: { amount: 2500 }
  }

  const totalDaily = Object.values(dailyData).reduce(
    (sum, { amount }) => sum + amount,
    0
  )

  const onDateChange = (
    event: DateTimePickerEvent,
    selected: Date | undefined
  ): void => {
    setShowDatePicker(false)
    if (selected) {
      setSelectedDate(selected)
    }
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <View style={styles.container}>
      {/* 日付選択 */}
      <View style={styles.dateContainer}>
        <Pressable
          style={styles.datePicker}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        </Pressable>
        <Pressable
          style={styles.calendarButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>カレンダー</Text>
        </Pressable>
      </View>

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
                    : '夕食'}
                </Text>
                <Text style={styles.amountText}>
                  ¥{data.amount.toLocaleString()}
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(data.amount / totalDaily) * 100}%` }
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

const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8
  },
  datePicker: {
    flex: 1,
    padding: 8
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600'
  },
  calendarButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8
  },
  expenseCard: {
    padding: 16
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16
  },
  expenseList: {
    gap: 12
  },
  expenseItem: {
    gap: 4
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mealTimeText: {
    fontSize: 14,
    fontWeight: '500'
  },
  amountText: {
    fontSize: 14,
    fontWeight: '500'
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0891b2',
    borderRadius: 4
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600'
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
