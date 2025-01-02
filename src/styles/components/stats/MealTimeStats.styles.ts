import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16
  },
  statsCard: {
    padding: 16
  },
  mealLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  averageText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  },
  comparisonCard: {
    padding: 16
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 16
  },
  progressContainer: {
    gap: 16
  },
  progressItem: {
    gap: 8
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600'
  },
  progressAmount: {
    fontSize: 14,
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
    backgroundColor: '#2196F3',
    borderRadius: 2
  }
})
