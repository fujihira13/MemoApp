import { View, ScrollView } from 'react-native'
import { Stack } from 'expo-router'
import { BudgetSettings } from '../../../src/components/settings/BudgetSettings'
import React from 'react'
import { styles } from './settings.styles'

/**
 * SettingsScreenコンポーネント
 * 設定画面を表示する
 * @returns {React.JSX.Element} 設定画面のJSX要素
 */
export default function SettingsScreen(): React.JSX.Element {
  return (
    <>
      {/* 画面のヘッダー設定 */}
      <Stack.Screen
        options={{
          title: '設定',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' }
        }}
      />

      {/* スクロール可能なコンテナ */}
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <BudgetSettings />
        </View>
      </ScrollView>
    </>
  )
}
