import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

type Props = {}

const BMICalculator = (props: Props) => {
    const [weight, setWeight] = React.useState<string>('');
    const [height, setHeight] = React.useState<string>('');
    const [bmi, setBmi] = React.useState<number>(0);
    const [category, setCategory] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    const inputWeightRef = React.useRef<TextInput>(null);
    const inputHeightRef = React.useRef<TextInput>(null);
    const categoryColor = (): {[key: string]: string} => ({
        'Underweight': '#3498db',
        'Normal weight': '#2ecc71',
        'Overweight': '#e75c11ff',
        'Obesity': '#ff0000ff',
        'Invalid height': '#7f8c8d'
    });
    const calculateBMI = () => {
        if (weight === '' && height === '') {
            setError('Please enter weight and height');
            inputHeightRef.current?.focus();
            return;
        } else if (height === '') {
            setError('Please enter height');
            inputHeightRef.current?.focus();
            return;
        } else if (weight === '') {
            setError('Please enter weight');
            inputWeightRef.current?.focus();
            return;
        } else if (isNaN(Number(weight)) && isNaN(Number(height))) {
            setError('Height and weight are not valid numbers');
            inputHeightRef.current?.focus();
            return;
        } else if (isNaN(Number(height))) {
            setError('Height is not a valid number');
            inputHeightRef.current?.focus();
            return;
        } else if (isNaN(Number(weight))) {
            setError('Weight is not a valid number');
            inputWeightRef.current?.focus();
            return;
        }else if (Number(height) > 0 && Number(weight) >= 0) {
            const bmiValue = Number(weight) / (Number(height) * Number(height));
            setBmi(Number(bmiValue.toFixed(2)));
            setError('');
            if (bmiValue < 18.5) {
                setCategory('Underweight');
            } else if (bmiValue < 24.9) {
                setCategory('Normal weight');
            } else if (bmiValue < 29.9) {
                setCategory('Overweight');
            } else {
                setCategory('Obesity');
            }
        } else if (Number(height) < 0) {
            setError('Height must be greater than zero');
            inputHeightRef.current?.focus();
        } else {
            setError('Weight cannot be negative');
            inputWeightRef.current?.focus();
        }
    };

    const resetFields = () => {
        setWeight('');
        setHeight('');
        setBmi(0);
        setCategory('');
        setError('');
    };
    // Helper: compute ideal weight range and actionable suggestions
    const getIdealWeightRange = (h: number) => {
        if (!h || h <= 0) return null;
        const min = 18.5 * h * h;
        const max = 24.9 * h * h;
        return { min, max };
    };

    const getRecommendations = (cat: string, weightNum: number | null, idealRange: { min: number; max: number } | null) => {
        if (!cat) return [] as string[];
        const recs: string[] = [];
        if (cat === 'Underweight') {
            recs.push('Increase calorie intake with nutrient-dense foods (nuts, avocados, lean proteins).');
            recs.push('Focus on strength training 2–4x per week to build muscle mass.');
            recs.push('Consider meeting a dietitian if you have trouble gaining weight.');
            if (idealRange && weightNum != null) recs.push(`Target weight range: ${idealRange.min.toFixed(1)}–${idealRange.max.toFixed(1)} kg.`);
        } else if (cat === 'Normal weight') {
            recs.push('Maintain a balanced diet and regular physical activity.');
            recs.push('Aim for a mix of cardio and strength training to keep fitness.');
            if (idealRange && weightNum != null) recs.push(`Recommended range remains ${idealRange.min.toFixed(1)}–${idealRange.max.toFixed(1)} kg.`);
        } else if (cat === 'Overweight' || cat === 'Obesity') {
            recs.push('Create a modest calorie deficit (e.g., 300–500 kcal/day) to lose weight gradually.');
            recs.push('Increase physical activity: combine cardio and resistance training.');
            recs.push('Consult a healthcare professional before starting an aggressive weight-loss program.');
            if (idealRange && weightNum != null) recs.push(`A reasonable target is within ${idealRange.min.toFixed(1)}–${idealRange.max.toFixed(1)} kg.`);
        }
        return recs;
    };
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.header}>BMI Calculator</Text>

                    <View>
                        <Text style={styles.inputTitle}>Height (m):</Text>
                        <TextInput
                            ref={inputHeightRef}
                            style={styles.inputField}
                            value={height}
                            placeholder="Enter height in meters"
                            placeholderTextColor={'grey'}
                            onChangeText={setHeight}
                            returnKeyType="next"
                            onSubmitEditing={() => inputWeightRef.current?.focus()}
                        />
                    </View>

                    <View>
                        <Text style={styles.inputTitle}>Weight (kg):</Text>
                        <TextInput
                            ref={inputWeightRef}
                            style={styles.inputField}
                            value={weight}
                            placeholder="Enter weight in kilograms"
                            placeholderTextColor={'grey'}
                            onChangeText={setWeight}
                            returnKeyType="done"
                            onSubmitEditing={calculateBMI}
                        />
                    </View>

                    <View>
                        {error !== '' && <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text>}
                        {bmi !== 0 && error === '' && <Text style={styles.result}>Your BMI is: {bmi} kg/m²</Text>}
                        {category !== '' && error === '' && (
                            <>
                                <Text style={styles.result}>
                                    Category: <Text style={{ color: categoryColor()[category] }}>{category}</Text>
                                </Text>
                                {/* Ideal weight range and recommendations */}
                                {(() => {
                                    const hNum = Number(height);
                                    const wNum = Number(weight);
                                    const ideal = getIdealWeightRange(hNum);
                                    const recs = getRecommendations(category, isNaN(wNum) ? null : wNum, ideal);
                                    return (
                                        <View style={{ marginTop: 8 }}>
                                            {ideal && (
                                                <Text style={styles.result}>
                                                    Ideal weight range: {ideal.min.toFixed(1)} - {ideal.max.toFixed(1)} kg
                                                </Text>
                                            )}
                                            {recs.map((r, idx) => (
                                                <Text key={idx} style={{ marginTop: 6 }}>{`• ${r}`}</Text>
                                            ))}
                                        </View>
                                    );
                                })()}
                            </>
                        )}
                    </View>

                    <View>
                        <TouchableOpacity
                            style={{ marginBottom: 16, backgroundColor: '#4af302ff', padding: 10, borderRadius: 5, alignItems: 'center' }}
                            onPress={calculateBMI}
                        >
                            <Text>Calculate BMI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: '#f54242ff', padding: 10, borderRadius: 5, alignItems: 'center' }}
                            onPress={resetFields}
                        >
                            <Text>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        padding: 16,
        gap: 16
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#4af302ff',
        backgroundColor: '#000000ff',
        padding: 8,
        borderRadius: 8,
    },
    inputTitle: {
        fontSize: 18,
        marginBottom: 8,
    },
    inputField: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#ffffff'
    },
    result: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    }
})

export default BMICalculator