import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from '../../styles/common/MonthPicker.styles'

interface MonthPickerProps {
  selectedMonth: Date
  onMonthChange: (date: Date) => void
}

/**
 * MonthPickerコンポーネント
 * 月の選択を行うピッカーコンポーネント
 * @param {MonthPickerProps} props コンポーネントのプロパティ
 * @returns {React.JSX.Element} 月選択ピッカーのJSX要素
 */
export const MonthPicker = ({
  selectedMonth,
  onMonthChange
}: MonthPickerProps): React.JSX.Element => {
  // 前月へ
  const goToPreviousMonth = (): void => {
    const newDate = new Date(selectedMonth)
    newDate.setMonth(newDate.getMonth() - 1)
    onMonthChange(newDate)
  }

  // 次の月に変更する関数
  const goToNextMonth = (): void => {
    const newDate = new Date(selectedMonth)
    newDate.setMonth(newDate.getMonth() + 1)
    onMonthChange(newDate)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToPreviousMonth} style={styles.button}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="#666" />
      </TouchableOpacity>

      <Text style={styles.monthText}>
        {selectedMonth.toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: 'long'
        })}
      </Text>

      <TouchableOpacity onPress={goToNextMonth} style={styles.button}>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  )
}
