import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { SpendingSummaryCard } from '../../src/compornents/cards/SpendingSummaryCard'
import { TabView } from '../../src/compornents/common/TabView'
import { MealTimeStats } from '../../src/compornents/stats/MealTimeStats'
import { ExpenseHistory } from '../../src/compornents/stats/ExpenseHistory'
import { useState } from 'react'
import { DailyReport } from '../../src/compornents/stats/DailyReport'
import { CookingAnalysis } from '../../src/compornents/stats/CookingAnalysis'

export default function Home(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState('timeRange')

  // サンプルデータ
  const summaryData = {
    totalExpense: 85000,
    wasteExpense: 35000
  }

  const tabs = [
    { id: 'timeRange', label: '時間帯別' },
    { id: 'daily', label: '日別レポート' },
    { id: 'analysis', label: '自炊分析' }
  ]

  return (
    <>
      <Stack.Screen
        options={{
          title: '食費管理アプリ',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' }
        }}
      />

      <ScrollView style={styles.container}>
        {/* 支出サマリーカード */}
        <View style={styles.summaryContainer}>
          <SpendingSummaryCard data={summaryData} />
        </View>

        {/* タブビュー */}
        <TabView tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* タブコンテンツ */}
        <View style={styles.contentContainer}>
          {activeTab === 'timeRange' && <MealTimeStats />}
          {activeTab === 'daily' && <DailyReport />}
          {activeTab === 'analysis' && <CookingAnalysis />}
        </View>

        {/* 支出履歴 */}
        <ExpenseHistory />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  summaryContainer: {
    padding: 16
  },
  contentContainer: {
    padding: 16
  }
})
