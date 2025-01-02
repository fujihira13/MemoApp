import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Card } from '../common/Card'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { ExpenseCategory, MealTime, ExpenseFormData } from '../../types/expense'
import { styles } from '../../styles/components/forms/ExpenseForm.styles'
export const ExpenseForm = (): React.JSX.Element => {
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: '',
    category: 'grocery',
    mealTime: 'none',
    isHomeCooking: false,
    date: new Date(),
    note: ''
  })

  const [showDatePicker, setShowDatePicker] = useState(false)

  const categories = [
    { value: 'grocery', label: 'スーパー' },
    { value: 'eating_out', label: '外食' },
    { value: 'snack', label: '間食' },
    { value: 'drinking', label: '飲み会' },
    { value: 'convenience', label: 'コンビニ' },
    { value: 'home_cooking', label: '自炊' },
    { value: 'other', label: 'その他' }
  ]

  const mealTimes = [
    { value: 'breakfast', label: '朝食' },
    { value: 'lunch', label: '昼食' },
    { value: 'dinner', label: '夕食' },
    { value: 'none', label: '該当なし' }
  ]

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ): void => {
    setShowDatePicker(false)
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, date: selectedDate }))
    }
  }

  const handleSubmit = (): void => {
    // ここで支出データを保存する処理を実装
    console.log(formData)
  }

  return (
    <View style={styles.container}>
      {/* 自炊チェックボックス */}
      <Card style={styles.checkboxCard}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() =>
            setFormData((prev) => ({
              ...prev,
              isHomeCooking: !prev.isHomeCooking,
              amount: !prev.isHomeCooking ? '0' : prev.amount
            }))
          }
        >
          <MaterialCommunityIcons
            name={
              formData.isHomeCooking
                ? 'checkbox-marked'
                : 'checkbox-blank-outline'
            }
            size={24}
            color="#0891b2"
          />
          <Text style={styles.checkboxLabel}>自炊した</Text>
        </TouchableOpacity>
        <Text style={styles.checkboxDescription}>
          自炊した場合はチェックを入れてください
        </Text>
      </Card>

      {/* 金額入力 */}
      {!formData.isHomeCooking && (
        <Card style={styles.inputCard}>
          <Text style={styles.label}>金額</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currency}>¥</Text>
            <TextInput
              style={styles.amountInput}
              value={formData.amount}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, amount: text }))
              }
              keyboardType="numeric"
              placeholder="1000"
            />
          </View>
        </Card>
      )}

      {/* カテゴリー選択 */}
      <Card style={styles.inputCard}>
        <Text style={styles.label}>カテゴリー</Text>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.value}
              style={[
                styles.categoryButton,
                formData.category === category.value &&
                  styles.categoryButtonActive
              ]}
              onPress={() =>
                setFormData((prev) => ({
                  ...prev,
                  category: category.value as ExpenseCategory
                }))
              }
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  formData.category === category.value &&
                    styles.categoryButtonTextActive
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* 食事の時間帯 */}
      <Card style={styles.inputCard}>
        <Text style={styles.label}>食事の時間帯</Text>
        <View style={styles.mealTimeContainer}>
          {mealTimes.map((mealTime) => (
            <TouchableOpacity
              key={mealTime.value}
              style={[
                styles.mealTimeButton,
                formData.mealTime === mealTime.value &&
                  styles.mealTimeButtonActive
              ]}
              onPress={() =>
                setFormData((prev) => ({
                  ...prev,
                  mealTime: mealTime.value as MealTime
                }))
              }
            >
              <Text
                style={[
                  styles.mealTimeButtonText,
                  formData.mealTime === mealTime.value &&
                    styles.mealTimeButtonTextActive
                ]}
              >
                {mealTime.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* 日付選択 */}
      <Card style={styles.inputCard}>
        <Text style={styles.label}>日付</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {formData.date.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
          <MaterialCommunityIcons name="calendar" size={24} color="#666" />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={formData.date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            locale="ja"
          />
        )}
      </Card>

      {/* メモ入力 */}
      <Card style={styles.inputCard}>
        <Text style={styles.label}>メモ</Text>
        <TextInput
          style={styles.noteInput}
          value={formData.note}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, note: text }))
          }
          placeholder="メモを入力（任意）"
          multiline
        />
      </Card>

      {/* 送信ボタン */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>支出を記録</Text>
      </TouchableOpacity>
    </View>
  )
}
