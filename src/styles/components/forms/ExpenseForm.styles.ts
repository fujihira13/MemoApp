import { StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 8,
    padding: spacing.md
  },
  inputContainer: {
    marginBottom: spacing.md
  },
  label: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginBottom: spacing.xs
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text.primary
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md
  },
  switchLabel: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary
  },
  noteInput: {
    height: 80,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    textAlignVertical: 'top'
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center'
  },
  submitButtonText: {
    color: colors.background.card,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium
  },
  mealTimeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5'
  },
  mealTimeButtonActive: {
    backgroundColor: '#0891b2'
  },
  mealTimeButtonText: {
    fontSize: 14,
    color: '#666'
  },
  mealTimeButtonTextActive: {
    color: '#ffffff'
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8
  },
  categoryButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5'
  },
  categoryButtonActive: {
    backgroundColor: '#0891b2'
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666'
  },
  categoryButtonTextActive: {
    color: '#ffffff'
  },
  inputCard: {
    backgroundColor: colors.background.card,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md
  },
  mealTimeContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap'
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8
  },
  dateButtonText: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary
  }
})
