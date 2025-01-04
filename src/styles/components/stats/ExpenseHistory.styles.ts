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
    paddingVertical: 12,
    alignItems: 'center'
  },
  cell: {
    justifyContent: 'center'
  },
  dateCell: {
    flex: 2
  },
  mealTimeCell: {
    flex: 1.5
  },
  categoryCell: {
    flex: 2
  },
  amountCell: {
    flex: 1.5,
    textAlign: 'right',
    paddingRight: 16
  },
  noteCell: {
    flex: 2
  },
  actionCell: {
    flexDirection: 'row',
    gap: 8,
    width: 80,
    justifyContent: 'flex-end'
  },
  editButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  emptyState: {
    padding: 32,
    alignItems: 'center'
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666'
  },
  iconButton: {
    padding: 4
  }
})
