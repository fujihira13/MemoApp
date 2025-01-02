import React from 'react'
import { View, Text } from 'react-native'
import { Card } from '../common/Card'
import { styles } from '../../styles/components/stats/MealTimeStats.styles'
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
