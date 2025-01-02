import { StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const styles = StyleSheet.create({
  container: {
    padding: spacing.md
  },
  header: {
    marginBottom: spacing.md
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.background.main,
    padding: spacing.sm,
    borderRadius: 4
  },
  headerCell: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  cell: {
    fontSize: typography.fontSize.sm
  },
  dateCell: {
    width: '15%'
  },
  mealTimeCell: {
    width: '15%'
  },
  categoryCell: {
    width: '20%'
  },
  amountCell: {
    width: '20%'
  },
  noteCell: {
    flex: 1
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8
  },
  editButton: {
    padding: 8,
    marginHorizontal: 4
  }
})
