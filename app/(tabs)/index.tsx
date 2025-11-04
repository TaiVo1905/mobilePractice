import StudentManagement from '@/components/buoi9/StudentManagement';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View style={{ height: 50, backgroundColor: '#6200EE', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Header</Text>
      </View> */}
      {/* <FirstOrderEquation /> */}
      {/* <BMICalculator /> */}
      {/* <Flex /> */}
      {/* <ProductList /> */}
      {/* <View style={{ height: 50, backgroundColor: '#6200EE', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Footer</Text>
      </View> */}
      <StudentManagement />
    </SafeAreaView>
  );
}
