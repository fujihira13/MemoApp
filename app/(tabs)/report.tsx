import { ScrollView, StyleSheet } from 'react-native'
import { MonthlyReport } from '../../src/compornents/reports/MonthlyReport'
import { Stack } from 'expo-router'
import React from 'react'

export default function ReportScreen(): React.JSX.Element {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'レポート',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' }
        }}
      />

      <ScrollView style={styles.container}>
        <MonthlyReport />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
})
