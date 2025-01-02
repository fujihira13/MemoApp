import { StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const styles = StyleSheet.create({
  container: {
    gap: spacing.md
  },
  statsCard: {
    padding: spacing.md
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
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold
  },
  subText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs
  },
  breakdownCard: {
    padding: spacing.md
  },
  breakdownList: {
    marginTop: spacing.sm,
    gap: spacing.sm
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mealTimeLabel: {
    fontSize: typography.fontSize.sm,
    width: 40
  },
  countContainer: {
    flex: 1,
    marginLeft: spacing.sm
  },
  countValue: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs
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
