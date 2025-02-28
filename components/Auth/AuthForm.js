import { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Button from '../ui/Button';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        {/* Afficher "Hello" */}
        <Text style={styles.helloText}>Hello</Text>

        {/* Afficher un texte conditionnel sous "Hello" */}
        <Text style={styles.subText}>
          {isLogin ? 'Sign in to your account' : 'Sign up to continue'}
        </Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={[styles.input, emailIsInvalid && styles.invalidInput]}
            value={enteredEmail}
            onChangeText={updateInputValueHandler.bind(this, 'email')}
            placeholder="Email Address"
            keyboardType="email-address"
          />
        </View>
        {!isLogin && (
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={20} color="gray" style={styles.icon} />
            <TextInput
              style={[styles.input, emailsDontMatch && styles.invalidInput]}
              value={enteredConfirmEmail}
              onChangeText={updateInputValueHandler.bind(this, 'confirmEmail')}
              placeholder="Confirm Email Address"
              keyboardType="email-address"
            />
          </View>
        )}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={[styles.input, passwordIsInvalid && styles.invalidInput]}
            value={enteredPassword}
            onChangeText={updateInputValueHandler.bind(this, 'password')}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        {!isLogin && (
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="gray" style={styles.icon} />
            <TextInput
              style={[styles.input, passwordsDontMatch && styles.invalidInput]}
              value={enteredConfirmPassword}
              onChangeText={updateInputValueHandler.bind(this, 'confirmPassword')}
              placeholder="Confirm Password"
              secureTextEntry
            />
          </View>
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
  },
  helloText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: 'gray',
  },
  inputContainer: {
    marginBottom: 12,
    position: 'relative',
  },
  input: {
    width: '100%',
    paddingLeft: 40,  // Espace pour l'icône
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  invalidInput: {
    borderColor: 'red',
  },
  icon: {
    position: 'absolute',
    left: 10,  // Positionnement de l'icône dans le champ
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  buttons: {
    marginTop: 12,
  },
});

export default AuthForm;
