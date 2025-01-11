import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabsLayout(): React.JSX.Element {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: '#666666',
        headerShown: true,
        headerTitleAlign: 'center',
        tabBarLabelStyle: {
          fontSize: 12
        },
        lazy: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ダッシュボード',
          tabBarLabel: 'ダッシュボード',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={24}
              color={color}
            />
          )
        }}
        initialParams={{ label: 'ダッシュボード' }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'レポート',
          tabBarLabel: 'レポート',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-box" size={24} color={color} />
          )
        }}
        initialParams={{ label: 'レポート' }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: '支出を記録',
          tabBarLabel: '支出を記録',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              size={24}
              color={color}
            />
          )
        }}
        initialParams={{ label: '支出を記録' }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '設定',
          tabBarLabel: '設定',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" size={24} color={color} />
          )
        }}
        initialParams={{ label: '設定' }}
      />
    </Tabs>
  )
}
