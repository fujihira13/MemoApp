import { StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const styles = StyleSheet.create({
  container: {
    gap: spacing.md
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.sm
  },
  datePicker: {
    flex: 1,
    padding: spacing.sm
  },
  dateText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium
  },
  calendarButton: {
    backgroundColor: colors.background.main,
    padding: spacing.sm,
    borderRadius: 8
  },
  expenseCard: {
    padding: spacing.md
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md
  },
  expenseList: {
    gap: spacing.sm
  },
  expenseItem: {
    gap: spacing.xs
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mealTimeText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium
  },
  amountText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background.main,
    borderRadius: 4
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  totalLabel: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium
  },
  totalAmount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold
  }
})
