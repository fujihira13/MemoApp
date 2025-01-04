import { StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md
  },
  // サマリーカード関連
  summary: {
    marginBottom: spacing.lg
  },
  summaryCard: {
    padding: spacing.md,
    marginBottom: spacing.md
  },
  cardHeader: {
    marginBottom: spacing.md
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md
  },
  // トレンド表示関連
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  totalAmount: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  percentageText: {
    fontSize: typography.fontSize.md,
    marginLeft: spacing.xs
  },
  // カテゴリー別支出関連
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontWeight: typography.fontWeight.medium
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
  },
  lastMonthText: {
    fontSize: 14,
    color: '#666'
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  budgetText: {
    fontSize: 14,
    color: '#666'
  },
  categoryCard: {
    padding: 16,
    marginBottom: 16
  },
  categoryList: {
    marginTop: 16
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  }
})
