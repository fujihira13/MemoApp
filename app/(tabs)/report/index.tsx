import { ScrollView, StyleSheet } from 'react-native'
import { MonthlyReport } from '../../../src/compornents/reports/MonthlyReport'
import { Stack } from 'expo-router'
import React, { useState, useEffect } from 'react' // useState, useEffect を追加
import { useExpenseStorage } from '../../../src/hooks/useExpenseStorage' // 追加

export default function ReportScreen(): React.JSX.Element {
  const { subscribe } = useExpenseStorage() // 追加
  const [updateTrigger, setUpdateTrigger] = useState(0) // 追加

  // データ更新検知の追加
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setUpdateTrigger((prev) => prev + 1)
    })
    return (): void => {
      unsubscribe()
    }
  }, [subscribe])

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
        <MonthlyReport key={updateTrigger} />
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
