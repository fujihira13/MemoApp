import { StyleSheet } from 'react-native'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 8,
    padding: spacing.md,
    elevation: 2,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2
  }
})
