import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card } from '../common/Card'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export const CookingAnalysis = (): React.JSX.Element => {
  // サンプルデータ
  const cookingStats = {
    monthlyCount: 15,
    estimatedSaving: 15000,
    mealTimeBreakdown: {
      breakfast: 3,
      lunch: 5,
      dinner: 7
    }
  }

  return (
    <View style={styles.container}>
      {/* 自炊回数 */}
      <Card style={styles.statsCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>今月の自炊回数</Text>
          <MaterialCommunityIcons name="pot-steam" size={20} color="#666" />
        </View>
        <Text style={styles.statValue}>{cookingStats.monthlyCount}回</Text>
      </Card>

      {/* 推定節約額 */}
      <Card style={styles.statsCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>推定節約額</Text>
          <MaterialCommunityIcons name="piggy-bank" size={20} color="#666" />
        </View>
        <Text style={styles.statValue}>
          ¥{cookingStats.estimatedSaving.toLocaleString()}
        </Text>
        <Text style={styles.subText}>1食あたり約1,000円で計算</Text>
      </Card>

      {/* 時間帯別自炊回数 */}
      <Card style={styles.breakdownCard}>
        <Text style={styles.cardTitle}>時間帯別自炊回数</Text>
        <View style={styles.breakdownList}>
          <View style={styles.breakdownItem}>
            <Text style={styles.mealTimeLabel}>朝食</Text>
            <View style={styles.countContainer}>
              <Text style={styles.countValue}>
                {cookingStats.mealTimeBreakdown.breakfast}回
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${
                        (cookingStats.mealTimeBreakdown.breakfast /
                          cookingStats.monthlyCount) *
                        100
                      }%`
                    }
                  ]}
                />
              </View>
            </View>
          </View>

          <View style={styles.breakdownItem}>
            <Text style={styles.mealTimeLabel}>昼食</Text>
            <View style={styles.countContainer}>
              <Text style={styles.countValue}>
                {cookingStats.mealTimeBreakdown.lunch}回
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${
                        (cookingStats.mealTimeBreakdown.lunch /
                          cookingStats.monthlyCount) *
                        100
                      }%`
                    }
                  ]}
                />
              </View>
            </View>
          </View>

          <View style={styles.breakdownItem}>
            <Text style={styles.mealTimeLabel}>夕食</Text>
            <View style={styles.countContainer}>
              <Text style={styles.countValue}>
                {cookingStats.mealTimeBreakdown.dinner}回
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${
                        (cookingStats.mealTimeBreakdown.dinner /
                          cookingStats.monthlyCount) *
                        100
                      }%`
                    }
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  statsCard: {
    padding: 16
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666'
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  subText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  },
  breakdownCard: {
    padding: 16
  },
  breakdownList: {
    marginTop: 12,
    gap: 12
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mealTimeLabel: {
    fontSize: 12,
    width: 40
  },
  countContainer: {
    flex: 1,
    marginLeft: 12
  },
  countValue: {
    fontSize: 12,
    marginBottom: 4
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0891b2',
    borderRadius: 4
  }
})
