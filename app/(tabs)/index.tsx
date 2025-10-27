import { FirstOrderEquation } from '@/components/buoi1/FirstOrderEquation';
import BMICalculator from '@/components/buoi4/BMICalculator';
import Flex from '@/components/buoi7/Flex';
import Products from '@/components/buoi7/ProductCard';
import ProductList from '@/components/buoi7/ProductList';
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 50, backgroundColor: '#6200EE', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Header</Text>
      </View>
      {/* <FirstOrderEquation /> */}
      {/* <BMICalculator /> */}
      {/* <Flex /> */}
      <ProductList />
      <View style={{ height: 50, backgroundColor: '#6200EE', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Footer</Text>
      </View>
    </SafeAreaView>
  );
}
