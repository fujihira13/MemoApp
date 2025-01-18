import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Stack } from 'expo-router'
import { ExpenseForm } from '../../../src/components/forms/ExpenseForm'
import { useExpenseStorage } from '../../../src/hooks/useExpenseStorage'
import { styles } from './expense.styles'

/**
 * ExpenseScreenコンポーネント
 * 支出記録画面を表示する
 * @returns {React.JSX.Element} 支出記録画面のJSX要素
 */
export default function ExpenseScreen(): React.JSX.Element {
  // useExpenseStorageフックからsubscribe関数を取得
  const { subscribe } = useExpenseStorage()
  // 更新トリガー用のステート
  const [updateTrigger, setUpdateTrigger] = useState(0)

  // コンポーネントのマウント時とアンマウント時の処理
  useEffect(() => {
    // 支出データの変更を購読
    const unsubscribe = subscribe(() => {
      // 変更があった場合、updateTriggerを更新
      setUpdateTrigger((prev) => prev + 1)
    })
    // クリーンアップ関数でアンマウント時に購読を解除
    return (): void => {
      unsubscribe()
    }
  }, [subscribe])

  return (
    <>
      {/* 画面のヘッダー設定 */}
      <Stack.Screen
        options={{
          title: '支出を記録',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' }
        }}
      />

      {/* スクロール可能なコンテナ */}
      <ScrollView style={styles.container}>
        {/* 支出記録フォームのコンテナ */}
        <View style={styles.formContainer}>
          {/* 支出記録フォームコンポーネント */}
          <ExpenseForm key={updateTrigger} />
        </View>
      </ScrollView>
    </>
  )
}
