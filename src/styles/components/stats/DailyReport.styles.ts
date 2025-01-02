import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16
  },
  dateCard: {
    padding: 16
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  dateText: {
    fontSize: 16,
    color: '#333'
  },
  expenseCard: {
    padding: 16
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333'
  },
  expenseList: {
    gap: 16
  },
  expenseItem: {
    gap: 8
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mealTimeText: {
    fontSize: 16,
    color: '#333'
  },
  amountText: {
    fontSize: 16,
    color: '#333'
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 2
  },
  totalContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0'
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3'
  }
})
