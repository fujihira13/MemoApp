import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native'
import { styles } from '../../styles/components/modals/ExpenseEditModal.styles'
import { Expense, ExpenseCategory, MealTime } from '../../types/expense'
import { EXPENSE_CATEGORIES } from '../../constants/categories'

interface ExpenseEditModalProps {
  visible: boolean
  expense: Expense | null
  onClose: () => void
  onSave: (updatedExpense: Expense) => void
}

/**
 * ExpenseEditModalコンポーネント
 * 支出編集モーダルを表示する
 * @param {ExpenseEditModalProps} props コンポーネントのプロパティ
 * @returns {React.JSX.Element} 支出編集モーダルのJSX要素
 */
export const ExpenseEditModal = ({
  visible,
  expense,
  onClose,
  onSave
}: ExpenseEditModalProps): React.JSX.Element | null => {
  const [formData, setFormData] = useState<Expense | null>(expense)

  useEffect(() => {
    if (expense) {
      setFormData({
        ...expense,
        mealTime: expense.mealTime || 'none'
      })
    }
  }, [expense])

  if (!formData) return null

  const handleSave = (): void => {
    const updatedExpense: Expense = {
      ...formData,
      amount: Number(formData.amount.toString()),
      date: new Date(formData.date).toISOString(),
      mealTime: formData.mealTime
    }
    onSave(updatedExpense)
    onClose()
  }

  // 時間帯の選択肢を追加
  const mealTimes: Array<{ label: string; value: MealTime }> = [
    { label: '朝食', value: 'breakfast' },
    { label: '昼食', value: 'lunch' },
    { label: '夕食', value: 'dinner' },
    { label: '間食', value: 'snack' }
  ]

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>支出を編集</Text>

          {/* 金額入力 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>金額</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currency}>¥</Text>
              <TextInput
                style={styles.amountInput}
                value={String(formData.amount)}
                onChangeText={(text) =>
                  setFormData((prev) =>
                    prev ? { ...prev, amount: Number(text) } : null
                  )
                }
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* カテゴリー選択 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>カテゴリー</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryContainer}
            >
              {EXPENSE_CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.value}
                  style={[
                    styles.categoryButton,
                    formData.category === category.value &&
                      styles.categoryButtonActive
                  ]}
                  onPress={() =>
                    setFormData((prev) =>
                      prev ? { ...prev, category: category.value } : null
                    )
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
            </ScrollView>
          </View>

          {/* 食事の時間帯選択 */}
          <View style={styles.inputContainer}>
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
                    setFormData((prev) =>
                      prev
                        ? {
                            ...prev,
                            mealTime: mealTime.value
                          }
                        : null
                    )
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
          </View>

          {/* ボタン */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={[styles.buttonText, styles.saveButtonText]}>
                保存
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
