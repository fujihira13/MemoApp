// src/components/common/TabView.tsx
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Tab {
  id: string
  label: string
}

interface TabViewProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export const TabView = ({
  tabs,
  activeTab,
  onTabChange
}: TabViewProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabChange(tab.id)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 4,
    margin: 16,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16
  },
  activeTab: {
    backgroundColor: '#0891b2'
  },
  tabText: {
    fontSize: 12,
    color: '#666'
  },
  activeTabText: {
    color: '#fff'
  }
})
