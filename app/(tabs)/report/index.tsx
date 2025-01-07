import { ScrollView } from 'react-native'
import { MonthlyReport } from '../../../src/compornents/reports/MonthlyReport'
import { Stack } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { useExpenseStorage } from '../../../src/hooks/useExpenseStorage'
import { useBudgetStorage } from '../../../src/hooks/useBudgetStorage'
import { styles } from './report.styles'

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

    return (): void => {
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
