import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { styles } from '../../styles/components/modals/ExpenseEditModal.styles'
import { Expense } from '../../types/expense'

interface ExpenseEditModalProps {
  visible: boolean
  expense: Expense | null
  onClose: () => void
  onSave: (updatedExpense: Expense) => Promise<void>
}

export const ExpenseEditModal = ({
  visible,
  expense,
  onClose,
  onSave
}: ExpenseEditModalProps): React.JSX.Element | null => {
  const [formData, setFormData] = useState<Expense | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    if (expense) {
      setFormData(expense)
    }
  }, [expense])

  if (!formData) return null

  const handleSave = async (): Promise<void> => {
    try {
      if (!validateForm()) return
      await onSave(formData)
      onClose()
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('編集エラー:', error.message)
        Alert.alert('エラー', '支出の編集に失敗しました')
      } else {
        console.error('予期しないエラー:', error)
      }
    }
  }

  const validateForm = (): boolean => {
    if (
      !formData.isHomeCooking &&
      (!formData.amount || isNaN(Number(formData.amount)))
    ) {
      Alert.alert('エラー', '金額を正しく入力してください')
      return false
    }
    return true
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>支出を編集</Text>

          {/* 金額入力 */}
          {!formData.isHomeCooking && (
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
          )}

          {/* メモ入力 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>メモ</Text>
            <TextInput
              style={styles.noteInput}
              value={formData.note}
              onChangeText={(text) =>
                setFormData((prev) => (prev ? { ...prev, note: text } : null))
              }
              multiline
            />
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
              onPress={() => void handleSave()}
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
