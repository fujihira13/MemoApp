import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform
} from 'react-native'
import { useRouter } from 'expo-router'
import { Card } from '../common/Card'
import { styles } from '../../styles/components/forms/ExpenseForm.styles'
import { checkboxStyles } from '../../styles/components/forms/CheckboxStyles'
import { amountInputStyles } from '../../styles/components/forms/AmountInputStyles'
import { useExpenseStorage } from '../../hooks/useExpenseStorage'
import { Expense, MealTime, ExpenseCategory } from '../../types/expense'
import {
  DateTimePickerEvent,
  default as DateTimePicker
} from '@react-native-community/datetimepicker'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type ExpenseFormData = {
  amount: string
  category: ExpenseCategory
  mealTime: MealTime
  isHomeCooking: boolean
  date: Date
  note: string
}

/**
 * ExpenseFormコンポーネント
 * 支出記録フォームを表示する
 * @returns {React.JSX.Element} 支出記録フォームのJSX要素
 */

export const ExpenseForm = (): React.JSX.Element => {
  const router = useRouter()
  const { addExpense } = useExpenseStorage()
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: '0',
    category: 'grocery',
    mealTime: 'none',
    isHomeCooking: false,
    date: new Date(),
    note: ''
  })

  const [showDatePicker, setShowDatePicker] = useState(false)

  const categories = [
    { label: 'スーパー', value: 'grocery' },
    { label: '外食', value: 'eating_out' },
    { label: '間食', value: 'snack' },
    { label: '飲み会', value: 'drinking' },
    { label: 'コンビニ', value: 'convenience' },
    { label: 'その他', value: 'other' }
  ]

  const mealTimes = [
    { label: '朝食', value: 'breakfast' },
    { label: '昼食', value: 'lunch' },
    { label: '夕食', value: 'dinner' },
    { label: '間食', value: 'snack' }
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

  const resetForm = (): void => {
    setFormData({
      amount: '0',
      category: 'grocery',
      mealTime: 'none',
      isHomeCooking: false,
      date: new Date(),
      note: ''
    })
  }

  const validateAmount = (amount: string): boolean => {
    if (!formData.isHomeCooking && (!amount || isNaN(Number(amount)))) {
      Alert.alert('エラー', '金額を正しく入力してください')
      return false
    }
    return true
  }

  const validateMealTime = (mealTime: string): boolean => {
    if (!mealTime || mealTime === 'none') {
      Alert.alert('エラー', '食事の時間帯を選択してください')
      return false
    }
    return true
  }

  const validateForm = (): boolean => {
    return (
      validateMealTime(formData.mealTime) && validateAmount(formData.amount)
    )
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      if (!validateForm()) return

      const expenseData: Expense = {
        id: Date.now().toString(),
        amount: formData.isHomeCooking ? 0 : Number(formData.amount),
        category: formData.isHomeCooking ? 'home_cooking' : formData.category,
        mealTime: formData.mealTime,
        isHomeCooking: formData.isHomeCooking,
        date: formData.date.toISOString(),
        note: formData.note
      }

      await addExpense(expenseData)
      Alert.alert('成功', '支出を記録しました', [
        {
          text: 'OK',
          onPress: (): void => {
            resetForm()
            router.push('/(tabs)')
          }
        }
      ])
    } catch (error) {
      console.error('支出の保存に失敗しました:', error)
      Alert.alert('エラー', '支出の保存に失敗しました')
    }
  }
  return (
    <View style={styles.container}>
      <View style={checkboxStyles.checkboxContainer}>
        <Switch
          value={formData.isHomeCooking}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, isHomeCooking: value }))
          }
        />
        <Text style={checkboxStyles.checkboxLabel}>自炊</Text>
      </View>
      <Text style={checkboxStyles.checkboxDescription}>
        自炊の場合は金額を0円として記録します
      </Text>

      {!formData.isHomeCooking && (
        <View style={amountInputStyles.amountContainer}>
          <Text>¥</Text>
          <TextInput
            style={amountInputStyles.amountInput}
            value={formData.amount}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, amount: text }))
            }
            keyboardType="numeric"
            placeholder="金額"
          />
        </View>
      )}

      {/* カテゴリー選択 */}
      {!formData.isHomeCooking && (
        <View style={styles.inputContainer}>
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
        </View>
      )}

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
      {/* <Card style={styles.inputCard}>
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
      </Card> */}

      {/* 送信ボタン */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => void handleSubmit()}
      >
        <Text style={styles.submitButtonText}>支出を記録</Text>
      </TouchableOpacity>
    </View>
  )
}
