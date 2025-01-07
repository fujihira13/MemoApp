import { View, ScrollView } from 'react-native'
import { Stack } from 'expo-router'
import { BudgetSettings } from '../../../src/compornents/settings/BudgetSettings'
import React from 'react'
import { styles } from './settings.styles'

export default function SettingsScreen(): React.JSX.Element {
  return (
    <>
      <Stack.Screen
        options={{
          title: '設定',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' }
        }}
      />

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <BudgetSettings />
        </View>
      </ScrollView>
    </>
  )
}
