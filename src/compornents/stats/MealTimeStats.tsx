import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card } from '../common/Card'

// interface MealTimeStatsProps {
//   // 必要に応じてpropsを追加
// }

export const MealTimeStats = (): React.JSX.Element => {
  // サンプルデータ
  const statsData = {
    breakfast: {
      amount: 25000,
      average: 833
    },
    lunch: {
      amount: 30000,
      average: 1000
    },
    dinner: {
      amount: 30000,
      average: 1000
    }
  }

  return (
    <View style={styles.container}>
      {/* 朝食 */}
      <Card style={styles.statsCard}>
        <Text style={styles.mealLabel}>朝食</Text>
        <Text style={styles.amount}>
          ¥{statsData.breakfast.amount.toLocaleString()}
        </Text>
        <Text style={styles.averageText}>
          1日平均: ¥{statsData.breakfast.average.toLocaleString()}
        </Text>
      </Card>

      {/* 昼食 */}
      <Card style={styles.statsCard}>
        <Text style={styles.mealLabel}>昼食</Text>
        <Text style={styles.amount}>
          ¥{statsData.lunch.amount.toLocaleString()}
        </Text>
        <Text style={styles.averageText}>
          1日平均: ¥{statsData.lunch.average.toLocaleString()}
        </Text>
      </Card>

      {/* 夕食 */}
      <Card style={styles.statsCard}>
        <Text style={styles.mealLabel}>夕食</Text>
        <Text style={styles.amount}>
          ¥{statsData.dinner.amount.toLocaleString()}
        </Text>
        <Text style={styles.averageText}>
          1日平均: ¥{statsData.dinner.average.toLocaleString()}
        </Text>
      </Card>

      {/* 時間帯別支出比較グラフ */}
      <Card style={styles.comparisonCard}>
        <Text style={styles.cardTitle}>時間帯別支出比較</Text>
        <View style={styles.progressContainer}>
          {Object.entries(statsData).map(([meal, data]) => (
            <View key={meal} style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>
                  {meal === 'breakfast'
                    ? '朝食'
                    : meal === 'lunch'
                    ? '昼食'
                    : '夕食'}
                </Text>
                <Text style={styles.progressAmount}>
                  ¥{data.amount.toLocaleString()}
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(data.amount / statsData.dinner.amount) * 100}%`
                    }
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </Card>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    gap: 12
  },
  statsCard: {
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  mealLabel: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4
  },
  averageText: {
    fontSize: 12,
    color: '#666'
  },
  comparisonCard: {
    padding: 16,
    marginTop: 8
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12
  },
  progressContainer: {
    gap: 12
  },
  progressItem: {
    gap: 4
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: 'medium'
  },
  progressAmount: {
    fontSize: 12,
    fontWeight: 'medium'
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
