import { FirstOrderEquation } from '@/components/buoi1/FirstOrderEquation';
import BMICalculator from '@/components/buoi4/BMICalculator';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BMICalculator />
    </SafeAreaView>
  );
}
