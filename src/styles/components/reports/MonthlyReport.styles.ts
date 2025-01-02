import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  summary: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16
  },
  summaryCard: {
    flex: 1,
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
    color: '#666',
    marginBottom: 8
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4
  },
  changeText: {
    fontSize: 14,
    color: '#666'
  },
  budgetText: {
    fontSize: 14,
    color: '#666'
  },
  categoryCard: {
    padding: 16
  },
  categoryList: {
    gap: 16
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryContent: {
    flex: 1
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600'
  },
  categoryAmount: {
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
    backgroundColor: '#2196F3',
    borderRadius: 2
  }
})
