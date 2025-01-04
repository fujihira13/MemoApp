import { StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  statRow: {
    marginBottom: 16
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mealTimeLabel: {
    fontSize: 16,
    fontWeight: '600'
  },
  statInfo: {
    alignItems: 'flex-end'
  },
  amount: {
    fontSize: 16,
    fontWeight: '600'
  },
  average: {
    fontSize: 12,
    color: '#666'
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 4
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4
  }
})
