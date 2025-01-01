import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Layout(): React.JSX.Element {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: '#666666'
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ダッシュボード',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={24}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'レポート',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-box" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: '支出を記録',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              size={24}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '設定',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" size={24} color={color} />
          )
        }}
      />
    </Tabs>
  )
}
