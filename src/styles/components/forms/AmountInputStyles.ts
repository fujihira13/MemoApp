import { StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const amountInputStyles = StyleSheet.create({
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.sm
  },
  amountInput: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    padding: spacing.sm
  }
})
