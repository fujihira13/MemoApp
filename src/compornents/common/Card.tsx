import React from 'react'
import { View, ViewStyle } from 'react-native'
import { styles } from '../../styles/common/Card.styles'

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
}

export const Card = ({ children, style }: CardProps): React.JSX.Element => {
  return <View style={[styles.container, style]}>{children}</View>
}
