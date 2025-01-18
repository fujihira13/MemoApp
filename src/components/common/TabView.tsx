import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../../styles/common/TabView.styles'

interface Tab {
  id: string
  label: string
}

interface TabViewProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}
/**
 * TabViewコンポーネント
 * タブ切り替え機能を提供する
 * @param {TabViewProps} props コンポーネントのプロパティ
 * @returns {React.JSX.Element} タブビューのJSX要素
 */
export const TabView = ({
  tabs,
  activeTab,
  onTabChange
}: TabViewProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
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
    </View>
  )
}
