import { StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.md
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  monthButton: {
    padding: spacing.sm
  },
  monthText: {
    fontSize: typography.fontSize.lg,
    minWidth: 120,
    textAlign: 'center',
    color: colors.text.primary
  },
  summary: {
    flexDirection: 'row',
    gap: spacing.md
  },
  summaryCard: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.background.card,
    borderRadius: 8,
    elevation: 2,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm
  },
  cardTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary
  },
  amount: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary
  },
  changeText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs
  },
  budgetText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs
  },
  categoryCard: {
    padding: spacing.md,
    backgroundColor: colors.background.card,
    borderRadius: 8,
    elevation: 2,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },

  categoryList: {
    marginTop: spacing.md,
    gap: spacing.sm
  },

  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },

  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background.main,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryContent: {
    flex: 1
  },

  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs
  },

  categoryLabel: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary
  },

  categoryAmount: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary
  },

  progressBar: {
    height: 4,
    backgroundColor: colors.background.main,
    borderRadius: 2,
    overflow: 'hidden'
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2
  }
})
