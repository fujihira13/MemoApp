import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    padding: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24
  },
  formGroup: {
    marginBottom: 24
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  currency: {
    fontSize: 16,
    color: '#666'
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 24
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4
  },
  submitButton: {
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})
