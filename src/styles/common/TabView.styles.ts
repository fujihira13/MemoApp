import { StyleSheet } from 'react-native'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
import { typography } from '../theme/typography'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 8,
    padding: spacing.xs
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: spacing.xs
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 6
  },
  activeTab: {
    // tabActive → activeTab
    backgroundColor: colors.primary
  },
  tabText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium
  },
  activeTabText: {
    // tabTextActive → activeTabText
    color: colors.background.card
  }
})
