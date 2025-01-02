import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600'
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  amountInfo: {
    alignItems: 'flex-end'
  },
  amount: {
    fontSize: 16,
    fontWeight: '600'
  },
  percentage: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  }
})
