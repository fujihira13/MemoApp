import { ExpenseCategory } from '../types/expense'

export const EXPENSE_CATEGORIES: Array<{
  value: ExpenseCategory
  label: string
  icon: string
}> = [
  { value: 'grocery', label: 'スーパー', icon: 'cart' },
  { value: 'eating_out', label: '外食', icon: 'silverware-fork-knife' },
  { value: 'snack', label: '間食', icon: 'food' },
  { value: 'drinking', label: '飲み会', icon: 'glass-wine' },
  { value: 'convenience', label: 'コンビニ', icon: 'store' },
  { value: 'other', label: 'その他', icon: 'dots-horizontal' }
]
