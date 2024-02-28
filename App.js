import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import SuccessPass from './componets/successfull';

const App = () => {
    const [email, setEmail] = useState('');
    const [showSuccessPass, setShowSuccessPass] = useState(false);

    const openWebView = () => {
        setShowSuccessPass(true);
    };

    const isValidEmail = (text) => {
        // Basic email validation
        return /\S+@\S+\.\S+/.test(text);
    }

    const onPressContinue = () => {
        if (isValidEmail(email)) {
            setShowSuccessPass(true);
            openWebView(); 
        } else {

            alert('Please enter a valid email address.');
        }
    }

    return (
        <View style={styles.container}>
            {!showSuccessPass && (  
                <View style={{ flex: 1 }}>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Your Email Here'
                        placeholderTextColor="black"
                        onChangeText={setEmail}
                        value={email}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onPressContinue }
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            )}
            <SuccessPass show={showSuccessPass} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
    },
    input: {
        borderWidth: 1,
        marginTop: 400,
        marginBottom: 10,
        borderRadius: 10,
        width: 350,
        left: "8%",
        color: "#060606"
    },
    button: {
        marginTop: 10,
        backgroundColor: "#4DB2F3",
        paddingVertical: 10,
        left: "24%",
        borderRadius: 10,
        width: "50%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center"
    },
});

export default App;
