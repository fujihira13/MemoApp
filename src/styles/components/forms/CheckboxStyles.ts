import { StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const checkboxStyles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.sm
  },
  checkboxLabel: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginLeft: spacing.sm
  },
  checkboxDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs
  }
})
