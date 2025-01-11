/**
 * 金額を通貨形式の文字列に変換する
 * @param {number} amount 金額
 * @returns {string} 通貨形式の文字列
 */
export const formatCurrency = (amount: number): string => {
  return `¥${amount.toLocaleString()}`
}

/**
 * 金額の割合を計算する
 * @param {number} amount 金額
 * @param {number} total 合計金額
 * @returns {number} 割合
 */
export const calculatePercentage = (amount: number, total: number): number => {
  return (amount / total) * 100
}
