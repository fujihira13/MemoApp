import { StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.md,
    backgroundColor: colors.background.main
  },
  inputCard: {
    padding: spacing.md,
    backgroundColor: colors.background.card,
    borderRadius: 8,
    elevation: 2,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.sm
  },
  currency: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    marginRight: spacing.xs
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    padding: spacing.sm
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.background.card
  },
  dateButtonText: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm
  },
  categoryButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background.main
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  categoryButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary
  },
  categoryButtonTextActive: {
    color: colors.background.card
  },
  mealTimeContainer: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  mealTimeButton: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center'
  },
  mealTimeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  mealTimeButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary
  },
  mealTimeButtonTextActive: {
    color: colors.background.card
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.sm
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
  // チェックボックス関連のスタイル
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
  },

  // 金額入力関連のスタイル
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
  },

  // チェックボックス関連の追加スタイル
  checkboxCard: {
    padding: spacing.md,
    backgroundColor: colors.background.card,
    borderRadius: 8,
    elevation: 2,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500'
  },
  toggleDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  },
  toggle: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    padding: 2
  },
  toggleActive: {
    backgroundColor: '#0891b2'
  },
  toggleKnob: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  toggleKnobActive: {
    transform: [{ translateX: 20 }]
  }
})
