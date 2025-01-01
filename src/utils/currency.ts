export const formatCurrency = (amount: number): string => {
  return `¥${amount.toLocaleString()}`
}

export const calculatePercentage = (amount: number, total: number): number => {
  return (amount / total) * 100
}
