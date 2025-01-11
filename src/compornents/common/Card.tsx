import React from 'react'
import { View, ViewStyle } from 'react-native'
import { styles } from '../../styles/common/Card.styles'

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
}

/**
 * Cardコンポーネント
 * カードスタイルのコンテナを提供する
 * @param {CardProps} props コンポーネントのプロパティ
 * @returns {React.JSX.Element} カードのJSX要素
 */
export const Card = ({ children, style }: CardProps): React.JSX.Element => {
  return <View style={[styles.container, style]}>{children}</View>
}
