import { View, ScrollView, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { ExpenseForm } from '../../../src/compornents/forms/ExpenseForm'
import React from 'react'

export default function ExpenseScreen(): React.JSX.Element {
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
          <ExpenseForm />
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
    maxWidth: 600, // タブレット対応
    width: '100%',
    alignSelf: 'center'
  }
})
