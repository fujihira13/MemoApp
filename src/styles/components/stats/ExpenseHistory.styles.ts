import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 16
  },
  container: {
    flex: 1,
    padding: 16
  },
  header: {
    marginBottom: 24
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  monthButton: {
    padding: 8
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16
  },
  totalContainer: {
    alignItems: 'center',
    marginBottom: 16
  },
  totalLabel: {
    fontSize: 14,
    color: '#666'
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3'
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
    marginBottom: 8
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#666'
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12
  },
  cell: {
    justifyContent: 'center'
  },
  dateCell: {
    flex: 2
  },
  mealTimeCell: {
    flex: 1
  },
  categoryCell: {
    flex: 1.5
  },
  amountCell: {
    flex: 1.5,
    textAlign: 'right'
  },
  noteCell: {
    flex: 2
  },
  actionCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  editButton: {
    padding: 8,
    marginRight: 8
  },
  deleteButton: {
    padding: 8
  },
  emptyState: {
    padding: 32,
    alignItems: 'center'
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666'
  }
})
