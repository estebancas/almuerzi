import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, Alert, AsyncStorage } from 'react-native';
import useForm from '../hooks/useForm';

export default ({ navigation }) => {
    const initialState = {
        email: '',
        password: ''
    }

    const onSubmit = values => {
        fetch('https://serverless.estcascor94.now.sh/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(values)
        })
        .then(x => x.text())
        .then(x => {
            try {
                return JSON.parse(x);
            } catch (err) {
                throw x
            }
        })
        .then(x => {
            AsyncStorage.setItem('token', x.token);
            navigation.navigate('Meals');
        })
        .catch(e => Alert.alert('Error', e))
    }

    const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login session</Text>
            <TextInput
                value={inputs.email}
                onChangeText={subscribe('email')}
                style={styles.input}
                autoCapitalize="none"
                placeholder="Email"
                />
            <TextInput
                value={inputs.password}
                onChangeText={subscribe('password')}
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                />
            <Button
                title="login"
                onPress={handleSubmit}
            />
            <Button
                title="Sign up"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 16
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        alignSelf: 'stretch',
        marginBottom: 10,
        paddingHorizontal: 5
    }
})