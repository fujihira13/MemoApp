import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
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
  mealTimeList: {
    marginTop: 16,
    gap: 16
  },
  mealTimeItem: {
    gap: 8
  },
  mealTimeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mealTimeLabel: {
    fontSize: 16,
    fontWeight: '600'
  },
  mealTimeCount: {
    fontSize: 16,
    fontWeight: '600'
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 2
  }
})
