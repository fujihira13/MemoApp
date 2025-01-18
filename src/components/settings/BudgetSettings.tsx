import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Card } from '../common/Card'
import { useBudgetStorage } from '../../hooks/useBudgetStorage'
import { styles } from '../../styles/components/settings/BudgetSettings.styles'

interface BudgetFormData {
  monthlyBudget: string
  dailyBudget: string
  enableNotifications: boolean
  warningThreshold: string
}

/**
 * BudgetSettingsコンポーネント
 * 予算設定フォームを表示する
 * @returns {React.JSX.Element} 予算設定フォームのJSX要素
 */
export const BudgetSettings = (): React.JSX.Element => {
  const { budgetSettings, saveBudgetSettings, subscribe } = useBudgetStorage()
  const [formData, setFormData] = useState<BudgetFormData>({
    monthlyBudget: '100000',
    dailyBudget: '3000',
    enableNotifications: true,
    warningThreshold: '80'
  })
  const [updateTrigger, setUpdateTrigger] = useState(0)

  // 初期データのロード
  useEffect(() => {
    if (budgetSettings) {
      setFormData(budgetSettings)
    }
  }, [budgetSettings])

  // データ更新を検知するためのサブスクリプション
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setUpdateTrigger((prev) => prev + 1)
    })
    return (): void => {
      unsubscribe()
    }
  }, [subscribe])

  const handleSubmit = async (): Promise<void> => {
    try {
      await saveBudgetSettings(formData)
      Alert.alert('成功', '設定を保存しました')
    } catch (error) {
      console.error('設定の保存に失敗しました:', error)
      Alert.alert('エラー', '設定の保存に失敗しました')
    }
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>予算設定</Text>
        <Text style={styles.description}>
          月間および日次の予算目標を設定します
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>月間予算</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currency}>¥</Text>
            <TextInput
              style={styles.input}
              value={formData.monthlyBudget}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, monthlyBudget: text }))
              }
              keyboardType="numeric"
              placeholder="100000"
            />
          </View>
          <Text style={styles.helperText}>
            1ヶ月の食費の目標金額を設定します
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>1日あたりの予算</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currency}>¥</Text>
            <TextInput
              style={styles.input}
              value={formData.dailyBudget}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, dailyBudget: text }))
              }
              keyboardType="numeric"
              placeholder="3000"
            />
          </View>
          <Text style={styles.helperText}>
            1日あたりの食費の目標金額を設定します
          </Text>
        </View>

        {/* 警告しきい値の機能をコメントアウト */}
        {/* <View style={styles.formGroup}>
          <Text style={styles.label}>警告しきい値 (%)</Text>
          <TextInput
            style={styles.input}
            value={formData.warningThreshold}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, warningThreshold: text }))
            }
            keyboardType="numeric"
            placeholder="80"
          />
          <Text style={styles.helperText}>
            予算の何%を超えたら警告を表示するかを設定します
          </Text>
        </View> */}

        {/* 通知機能をコメントアウト */}
        {/* <View style={styles.switchContainer}>
          <View>
            <Text style={styles.switchLabel}>通知</Text>
            <Text style={styles.helperText}>予算の警告通知を受け取ります</Text>
          </View>
          <Switch
            value={formData.enableNotifications}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, enableNotifications: value }))
            }
            trackColor={{ false: '#e0e0e0', true: '#0891b2' }}
          />
        </View> */}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => void handleSubmit()}
        >
          <Text style={styles.submitButtonText}>設定を保存</Text>
        </TouchableOpacity>
      </Card>
    </View>
  )
}
