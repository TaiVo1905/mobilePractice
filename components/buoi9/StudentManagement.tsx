import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react';

type Student = {
    id: string;
    name: string | null;
    age: number | null;
    grade: number | null;
};

type ErrorMessage = {
  nameError: string;
  ageError: string;
  gradeError: string;
};


const students: Student[] = [
    { id: '1', name: 'Alice', age: 20, grade: 9 },
    { id: '2', name: 'Bob', age: 22, grade: 8.5 },
    { id: '3', name: 'Charlie', age: 21, grade: 8.8 },
    { id: '4', name: 'David', age: 23, grade: 4.2 },
    { id: '5', name: 'Eve', age: 20, grade: 8.7 },
]; 

export default function StudentManagement() {
    const [studentsList, setStudentsList] = React.useState<Student[]>(students);
    const [studentTemp, setStudentTemp] = React.useState<Student>({id: '', name: null, age: null, grade: null});
    const [errorMessage, setErrorMessage] = React.useState<ErrorMessage>({nameError: '', ageError: '', gradeError: ''});
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc'); 
    const [isFiltered, setIsFiltered] = React.useState<boolean>(false);
    const [searchQuery, setSearchQuery] = React.useState<string>(''); // Thêm state cho tìm kiếm

    const nameInputRef = React.useRef<TextInput>(null);
    const ageInputRef = React.useRef<TextInput>(null);
    const gradeInputRef = React.useRef<TextInput>(null);

    const validateStudent = (student: Student) => {
        const newErrors: ErrorMessage = { nameError: '', ageError: '', gradeError: '' };
        let hasError = false;
        
        if (student.name === null || student.name.trim() === '') {
            newErrors.nameError = 'You must type students\' name.';
            hasError = true;
        } 
        
        if (student.age === null) {
            newErrors.ageError = 'You must type students\' age.';
            hasError = true;
        } else if (isNaN(student.age)) {
             newErrors.ageError = 'Age must be a number.';
             hasError = true;
        } else if (student.age <= 0 || student.age > 150) {
            newErrors.ageError = 'Age must be between 1 and 150.';
            hasError = true;
        }
        
        if (student.grade === null) {
            newErrors.gradeError = 'You must type students\' grade.';
            hasError = true;
        } else if (isNaN(student.grade)) {
            newErrors.gradeError = 'Grade must be a number.';
            hasError = true;
        } else if (student.grade < 0 || student.grade > 10) {
            newErrors.gradeError = 'Grade must be between 0 and 10.';
            hasError = true;
        }

        return { newErrors, hasError };
    }

    const addNewStudent = (student: Student) => {
        const { newErrors, hasError } = validateStudent(student);
        
        setErrorMessage(newErrors);

        if (hasError) {
            if (newErrors.nameError !== ''){
                nameInputRef.current?.focus();
            } else if (newErrors.ageError !== ''){
                ageInputRef.current?.focus();
            } else if (newErrors.gradeError !== ''){
                gradeInputRef.current?.focus();
            }
            return;
        } 

        const newId = (Math.max(...studentsList.map(s => Number(s.id)), 0) + 1).toString();
        student.id = newId;

        setStudentsList([...studentsList, student]);
        setStudentTemp({id: '', name: null, age: null, grade: null});
        setErrorMessage({nameError: '', ageError: '', gradeError: ''}); 
    }

    const handleEditPress = (student: Student) => {
        setEditingId(student.id);
        setStudentTemp(student);
        setErrorMessage({nameError: '', ageError: '', gradeError: ''});
        nameInputRef.current?.focus();
    };

    const handleUpdateStudent = () => {
        const { newErrors, hasError } = validateStudent(studentTemp);
        
        setErrorMessage(newErrors);

        if (hasError) {
            if (newErrors.nameError !== ''){
                nameInputRef.current?.focus();
            } else if (newErrors.ageError !== ''){
                ageInputRef.current?.focus();
            } else if (newErrors.gradeError !== ''){
                gradeInputRef.current?.focus();
            }
            return;
        }

        setStudentsList(studentsList.map(s => 
            s.id === editingId ? studentTemp : s 
        ));
        
        setEditingId(null);
        setStudentTemp({id: '', name: null, age: null, grade: null});
        setErrorMessage({nameError: '', ageError: '', gradeError: ''}); 
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setStudentTemp({id: '', name: null, age: null, grade: null});
        setErrorMessage({nameError: '', ageError: '', gradeError: ''});
    };

    const handleDeletePress = (student: Student) => {
        Alert.alert(
          "Confirmation",
          "Are you sure you want to delete " + student.name + "?",
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel"
            },
            {
              text: "OK",
              onPress: () => {
                setStudentsList(studentsList.filter(s => 
                  s.id !== student.id
                ));
                if (editingId === student.id) {
                    handleCancelEdit();
                }
              }
            }
          ],
          { cancelable: false }
        );
    };

    const sortStudentsByAge = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    };

    const displayList = React.useMemo(() => {
        let listToDisplay = [...studentsList];

        if (searchQuery.trim() !== '') {
            listToDisplay = listToDisplay.filter(student => 
                student.name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (isFiltered) {
            listToDisplay = listToDisplay.filter(student => student.grade !== null && student.grade >= 8);
        }

        listToDisplay.sort((a, b) => {
            const ageA = a.age || 0; 
            const ageB = b.age || 0; 
            return sortOrder === 'asc' ? ageA - ageB : ageB - ageA;
        });
        
        return listToDisplay;

    }, [studentsList, isFiltered, sortOrder, searchQuery]);


  return (
    <View style={{ backgroundColor: 'white', padding: 16, flex: 1 }}>
      <Text style={{textAlign: 'center', backgroundColor: '#ef2d17ff', marginBottom: 16, paddingVertical: 10, color: 'white'}} >StudentManagement</Text>
      <View style={styles.inputGroup}>
        <Text>
            Name:
        </Text>
        <TextInput style={styles.inputField} onChangeText={(name) => setStudentTemp({...studentTemp, name})} ref={nameInputRef} value={studentTemp.name || ''} onKeyPress={()=> setErrorMessage({...errorMessage, 'nameError': ''})}/>
          {errorMessage.nameError && <Text style={styles.errorMessage}>{errorMessage.nameError}</Text>}
      </View>
      <View style={styles.inputGroup}>
        <Text>
            Age:
        </Text>
        <TextInput style={styles.inputField}  onChangeText={(age) => setStudentTemp({...studentTemp, age: Number(age)})} ref={ageInputRef} value={String(studentTemp.age || '')}/>
          {errorMessage.ageError && <Text style={styles.errorMessage}>{errorMessage.ageError}</Text>}
      </View>
      <View style={styles.inputGroup}>
        <Text>
            Grade:
        </Text>
        <TextInput style={styles.inputField}  onChangeText={(grade) => setStudentTemp({...studentTemp, grade: Number(grade)})} ref={gradeInputRef} value={String(studentTemp.grade || '')}/>
          {errorMessage.gradeError && <Text style={styles.errorMessage}>{errorMessage.gradeError}</Text>}
      </View>

        {editingId ? (
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: 'blue', width: 140 }]} 
                    onPress={handleUpdateStudent}
                >
                    <Text style={styles.buttonText}>Update Student</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: 'gray', width: 140, marginLeft: 10 }]} 
                    onPress={handleCancelEdit}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: 'blue', width: 120, alignSelf: 'center', marginTop: 16 }]} 
                onPress={() => addNewStudent(studentTemp)}
            >
                <Text style={styles.buttonText}>Add Student</Text>
            </TouchableOpacity>
        )}

      <View style={styles.inputGroup}>
        <Text>Search by Name:</Text>
        <TextInput
            style={styles.inputField}
            placeholder="Type name to search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
        />
    </View>

      <View style={styles.featuresContainer}>
        <TouchableOpacity 
            style={styles.sortButton} 
            onPress={sortStudentsByAge}
        >
            <Text style={styles.buttonText}>
            Sort by Age ({sortOrder === 'asc' ? 'Asc' : 'Desc'})
            </Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.filterButton} 
            onPress={() => setIsFiltered(!isFiltered)}
        >
            <Text style={styles.buttonText}>
            {isFiltered ? 'Show All' : 'Filter Grade >= 8'}
            </Text>
        </TouchableOpacity>
      </View>


      <View style={{ marginTop: 16, borderWidth: 1, borderColor: '#ccc' }}>
        <View style={styles.tableHeader}>
            <Text style={[styles.textHeader, styles.tableCell]}>Id</Text>
            <Text style={[styles.textHeader, styles.tableCell]}>Name</Text>
            <Text style={[styles.textHeader, styles.tableCell]}>Age</Text>
            <Text style={[styles.textHeader, styles.tableCell]}>Grade</Text>
            <Text style={[styles.textHeader, styles.tableCell]}>Edit</Text>
            <Text style={[styles.textHeader, styles.tableCell]}>Delete</Text>
        </View>
        <FlatList
        data={displayList}
        renderItem={({...student}) => (
          <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{student.index + 1}</Text>
              <Text style={styles.tableCell}>{student.item.name}</Text>
              <Text style={styles.tableCell}>{student.item.age}</Text>
              <Text style={styles.tableCell}>{student.item.grade}</Text>
              <TouchableOpacity onPress={() => handleEditPress(student.item)}>
                <Text style={styles.tableCell}>🖌</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletePress(student.item)}>
                <Text style={styles.tableCell}>🗑</Text>
              </TouchableOpacity>
              
          </View>
        )}
        keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 12,
    },
    inputField: {
        marginTop: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 6,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#f0f0f0',
    },
    textHeader: {
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tableCell: {
        textAlign: 'center',
        width: 60
    },
    errorMessage: {
      color: 'red',
      marginTop: 4,
      fontSize: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    button: {
        padding: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    sortButton: {
        backgroundColor: '#0069d9', 
        padding: 12,
        alignItems: 'center',
        borderRadius: 8,
        flex: 1, 
        marginHorizontal: 5, 
    },
    filterButton: { 
        backgroundColor: '#28a745', 
        padding: 12,
        alignItems: 'center',
        borderRadius: 8,
        flex: 1, 
        marginHorizontal: 5, 
    },
})