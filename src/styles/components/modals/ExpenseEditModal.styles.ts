import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 8
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  currency: {
    fontSize: 18,
    marginRight: 8
  },
  amountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    fontSize: 16
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 5
  },
  cancelButton: {
    backgroundColor: '#f0f0f0'
  },
  saveButton: {
    backgroundColor: '#007AFF'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16
  },
  saveButtonText: {
    color: 'white'
  }
})
