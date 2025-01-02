import { StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const styles = StyleSheet.create({
  container: {
    gap: spacing.md
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md
  },
  statsCard: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.background.card
  },
  mealLabel: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.xs
  },
  amount: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary
  },
  averageText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginTop: spacing.xs
  },
  comparisonCard: {
    padding: spacing.md
  },
  cardTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
    marginBottom: spacing.md
  },
  progressContainer: {
    gap: spacing.md
  },
  progressItem: {
    gap: spacing.xs
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary
  },
  progressAmount: {
    fontSize: typography.fontSize.sm,
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
  }
})
