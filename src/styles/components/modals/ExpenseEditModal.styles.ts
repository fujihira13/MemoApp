import { StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: colors.background.card,
    borderRadius: 10,
    padding: spacing.md,
    width: '90%',
    maxWidth: 400
  },
  modalTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
    textAlign: 'center'
  },
  inputContainer: {
    marginBottom: spacing.md
  },
  label: {
    fontSize: typography.fontSize.md,
    marginBottom: spacing.sm
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: spacing.sm
  },
  currency: {
    fontSize: typography.fontSize.lg,
    marginRight: spacing.sm
  },
  amountInput: {
    flex: 1,
    padding: spacing.sm,
    fontSize: typography.fontSize.lg
  },
  categoryContainer: {
    flexDirection: 'row',
    marginHorizontal: -spacing.sm
  },
  categoryButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    backgroundColor: colors.background.main,
    marginRight: spacing.sm
  },
  categoryButtonActive: {
    backgroundColor: colors.primary
  },
  categoryButtonText: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary
  },
  categoryButtonTextActive: {
    color: colors.background.card
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md
  },
  button: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 5,
    marginHorizontal: spacing.xs
  },
  cancelButton: {
    backgroundColor: colors.background.main
  },
  saveButton: {
    backgroundColor: colors.primary
  },
  buttonText: {
    textAlign: 'center',
    fontSize: typography.fontSize.md
  },
  saveButtonText: {
    color: colors.background.card
  },
  mealTimeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  mealTimeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0'
  },
  mealTimeButtonActive: {
    backgroundColor: '#007AFF'
  },
  mealTimeButtonText: {
    fontSize: 14,
    color: '#333'
  },
  mealTimeButtonTextActive: {
    color: '#ffffff'
  }
})
