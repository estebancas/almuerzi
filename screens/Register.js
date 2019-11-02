import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, Alert } from 'react-native';
import useForm from '../hooks/useForm';

export default ({ navigation }) => {
    const initialState = {
        email: '',
        password: ''
    }

    const onSubmit = values => {
        fetch('https://serverless.estcascor94.now.sh/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(values)
        })
        .then(x => x.text())
        .then(x => {
            if (x === 'user created!!!') {
                return Alert.alert(
                    'Done',
                    x,
                    [
                        { text: 'go to home', onPress: () => navigation.navigate('Login') }
                    ]
                )
            }

            Alert.alert(
                'Error',
                x
            )
        })

    }

    const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                value={inputs.email}
                onChangeText={subscribe('email')}
                style={styles.input}
                placeholder="Email"
                autoCapitalize='none'
            />
            <TextInput
                value={inputs.password}
                onChangeText={subscribe('password')}
                style={styles.input}
                placeholder="Password"
                autoCapitalize='none'
                secureTextEntry={true}
            />
            <Button
                title="Send"
                onPress={handleSubmit}
            />
            <Button
                title="go back"
                onPress={() => navigation.navigate('Login')}
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