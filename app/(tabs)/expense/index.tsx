import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { ExpenseForm } from '../../../src/compornents/forms/ExpenseForm'
import { useExpenseStorage } from '../../../src/hooks/useExpenseStorage'

export default function ExpenseScreen(): React.JSX.Element {
  const { subscribe } = useExpenseStorage()
  const [updateTrigger, setUpdateTrigger] = useState(0)

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
          title: '支出を記録',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' }
        }}
      />

      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <ExpenseForm key={updateTrigger} />
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
  formContainer: {
    padding: 16,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center'
  }
})
