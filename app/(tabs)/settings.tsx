import { View, ScrollView, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { BudgetSettings } from '../../src/compornents/settings/BudgetSettings'
import React from 'react'

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    padding: 16,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center'
  }
})
