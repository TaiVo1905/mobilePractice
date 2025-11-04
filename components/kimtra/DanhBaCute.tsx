import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

const INITIAL_CONTACTS: Contact[] = [
  { id: '1', name: 'Linh', phone: '0889333444' },
  { id: '2', name: 'Hung', phone: '883922542' },
  { id: '3', name: 'Thanh', phone: '32532526' },
];

const DanhBaCute = () => {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');

  const handleAddContact = () => {
    if (name.trim() === '' || phone.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập đủ tên và số điện thoại.');
      return;
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
    };

    setContacts(prevContacts => [newContact, ...prevContacts]);

    setName('');
    setPhone('');
  };

  const handleDeleteContact = (id: string) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa liên hệ này?',
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Xóa', 
          style: 'destructive', 
          onPress: () => {
            setContacts(prevContacts =>
              prevContacts.filter(contact => contact.id !== id)
            );
          }
        },
      ]
    );
  };


  const handleOpenEditModal = (contact: Contact) => {
    setSelectedContact(contact);
    setEditName(contact.name);
    setEditPhone(contact.phone);
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!selectedContact) return;

    if (editName.trim() === '' || editPhone.trim() === '') {
      Alert.alert('Lỗi', 'Không được để trống thông tin.');
      return;
    }
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === selectedContact.id
          ? { ...contact, name: editName.trim(), phone: editPhone.trim() }
          : contact
      )
    );
    setModalVisible(false);
    setSelectedContact(null);
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contacts, searchQuery]);

  const renderContactItem = ({ item }: { item: Contact }) => (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactIcon}>👤</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.contactName}>{item.name} - </Text>
          <Text style={styles.contactPhone}>{item.phone}</Text>
        </View>
      </View>
      <View style={styles.contactButtons}>
        <TouchableOpacity onPress={() => handleOpenEditModal(item)}>
          <Text style={styles.editButton}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteContact(item.id)}>
          <Text style={styles.deleteButton}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.title}>📒 Danh Bạ Cute</Text>

        <View >
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🌸</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên"
              placeholderTextColor="#fda4af"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>📱</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#fda4af"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText} onPress={handleAddContact}>➕ THÊM</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.separator} />

        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredContacts}
          renderItem={renderContactItem}
          keyExtractor={item => item.id}
          style={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>Không có liên hệ nào.</Text>
          }
        />
      </KeyboardAvoidingView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sửa Liên Hệ</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>🌸</Text>
              <TextInput
                style={styles.input}
                placeholder="Tên"
                placeholderTextColor="#fda4af"
                value={editName}
                onChangeText={setEditName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>📱</Text>
              <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                placeholderTextColor="#fda4af"
                value={editPhone}
                onChangeText={setEditPhone}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveEdit}
              >
                <Text style={styles.saveButtonText}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff1f2',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ec4899',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#374151',
  },
  addButton: {
    backgroundColor: '#ec4899',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#fce7f3',
    marginVertical: 15,
  },
  list: {
    marginTop: 10,
  },
  contactItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIcon: {
    fontSize: 20,
    marginRight: 15,
    color: '#60a5fa',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  contactPhone: {
    fontSize: 14,
    color: '#6b7280',
  },
  contactButtons: {
    flexDirection: 'row',
  },
  editButton: {
    fontSize: 20,
    marginLeft: 15,
  },
  deleteButton: {
    fontSize: 20,
    marginLeft: 15,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#9ca3af',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ec4899',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#e5e7eb',
  },
  cancelButtonText: {
    color: '#374151', 
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#ec4899',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default DanhBaCute;