import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Card } from '../common/Card'
import { MonthlyReportData } from '../../types/expense'
import { styles } from '../../styles/components/reports/MonthlyReport.styles'

export const MonthlyReport = (): React.JSX.Element => {
  const [currentDate, setCurrentDate] = useState(new Date())

  // サンプルデータ
  const monthlyData: MonthlyReportData = {
    total: 85000,
    previousMonth: 92000,
    averagePerDay: 2833,
    dailyBudget: 3000,
    categories: {
      grocery: { amount: 45000, label: 'スーパー', icon: 'cart' },
      eating_out: {
        amount: 20000,
        label: '外食',
        icon: 'silverware-fork-knife'
      },
      snack: { amount: 5000, label: '間食', icon: 'food' },
      drinking: { amount: 10000, label: '飲み会', icon: 'glass-wine' },
      convenience: { amount: 5000, label: 'コンビニ', icon: 'store' }
    }
  }

  // 前月比の計算
  const percentageChange =
    ((monthlyData.total - monthlyData.previousMonth) /
      monthlyData.previousMonth) *
    100

  // 月を変更する関数
  const changeMonth = (increment: number): void => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + increment)
    setCurrentDate(newDate)
  }

  return (
    <View style={styles.container}>
      {/* 月選択ヘッダー */}
      <View style={styles.header}>
        <Text style={styles.title}>月次レポート</Text>
        <View style={styles.monthSelector}>
          <TouchableOpacity
            style={styles.monthButton}
            onPress={() => changeMonth(-1)}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color="#666"
            />
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
          </Text>
          <TouchableOpacity
            style={styles.monthButton}
            onPress={() => changeMonth(1)}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 支出サマリーカード */}
      <View style={styles.summary}>
        <Card style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>月間支出の推移</Text>
            <MaterialCommunityIcons
              name={percentageChange > 0 ? 'trending-up' : 'trending-down'}
              size={20}
              color={percentageChange > 0 ? '#ff4444' : '#4caf50'}
            />
          </View>
          <Text style={styles.amount}>
            ¥{monthlyData.total.toLocaleString()}
          </Text>
          <Text style={styles.changeText}>
            先月比 {percentageChange > 0 ? '+' : ''}
            {percentageChange.toFixed(1)}%
          </Text>
        </Card>

        <Card style={styles.summaryCard}>
          <Text style={styles.cardTitle}>1日あたりの平均</Text>
          <Text style={styles.amount}>
            ¥{monthlyData.averagePerDay.toLocaleString()}
          </Text>
          <Text style={styles.budgetText}>
            目標: ¥{monthlyData.dailyBudget.toLocaleString()}/日
          </Text>
        </Card>
      </View>

      {/* カテゴリー別支出 */}
      <Card style={styles.categoryCard}>
        <Text style={styles.cardTitle}>カテゴリー別支出</Text>
        <View style={styles.categoryList}>
          {Object.entries(monthlyData.categories).map(([key, category]) => (
            <View key={key} style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons
                  name={category.icon}
                  size={20}
                  color="#666"
                />
              </View>
              <View style={styles.categoryContent}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryLabel}>{category.label}</Text>
                  <Text style={styles.categoryAmount}>
                    ¥{category.amount.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(category.amount / monthlyData.total) * 100}%`
                      }
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </Card>
    </View>
  )
}
