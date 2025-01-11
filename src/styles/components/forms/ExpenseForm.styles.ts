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
    flexWrap: 'wrap', // 複数行に折り返し
    gap: spacing.sm, // ボタン間の間隔
    paddingVertical: spacing.sm
  },
  categoryButton: {
    // 幅を計算して3つずつ表示 (コンテナの幅から間隔を引いて3等分)
    width: '30%', // おおよその幅を指定
    padding: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.background.main,
    alignItems: 'center' // テキストを中央寄せ
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
