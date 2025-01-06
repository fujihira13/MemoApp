import { ScrollView, StyleSheet } from 'react-native'
import { MonthlyReport } from '../../../src/compornents/reports/MonthlyReport'
import { Stack } from 'expo-router'
import React, { useState, useEffect } from 'react' // useState, useEffect を追加
import { useExpenseStorage } from '../../../src/hooks/useExpenseStorage' // 追加
import { useBudgetStorage } from '../../../src/hooks/useBudgetStorage' // 追加

export default function ReportScreen(): React.JSX.Element {
  const { subscribe: subscribeExpense } = useExpenseStorage()
  const { subscribe: subscribeBudget } = useBudgetStorage()
  const [updateTrigger, setUpdateTrigger] = useState(0)

  useEffect(() => {
    const unsubscribeExpense = subscribeExpense(() => {
      setUpdateTrigger((prev) => prev + 1)
    })

    const unsubscribeBudget = subscribeBudget(() => {
      setUpdateTrigger((prev) => prev + 1)
    })

    return () => {
      unsubscribeExpense()
      unsubscribeBudget()
    }
  }, [subscribeExpense, subscribeBudget])

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
