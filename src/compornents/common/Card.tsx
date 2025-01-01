import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
}

export const Card = ({ children, style }: CardProps): React.JSX.Element => {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  }
})
