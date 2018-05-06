import React, { Component } from 'react';
import Expo from 'expo';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import { Auth } from "aws-amplify";

import globalStyles from '../styles/GlobalStyles';
import styles from '../styles/FormStyles';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmationCode: '',
      showError: false,
      formError: '',
      user: {}
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  // validateEmail = () => {
  //   const { email } = this.state;
  //   // const regex = /^(?=[A-Z0-9][A-Z0-9@._%+-]{5,253}$)[A-Z0-9._%+-]{1,64}@(?:(?=[A-Z0-9-]{1,63}\.)[A-Z0-9]+(?:-[A-Z0-9]+)*\.){1,8}[A-Z]{2,63}$/;
  //   const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   console.log('text bool = ', regex.test(email));
  //   if (!regex.test(email)) {
  //     this.setState({
  //       emailError: 'Please enter a valid email address',
  //       showEmailError: true
  //     });
  //     console.log('emailError: ', this.state.emailError);
  //   }
  // }

  signUp = () => {
    const { email, password } = this.state;
    Auth.signUp(email, password)
    .then(() => console.log('sign up success'))
    .catch(err => {
      console.log(`sign up ERROR: ${err.message}`, err)
      let errCopy;
      if (
        typeof err === 'string' && err.includes('first parameter')
        || typeof err === 'string' && err.includes('email')
        || err.message && err.message.includes('email')
      ) {
        errCopy = 'Please enter a valid email address';
      } else {
        errCopy = 'Please enter a valid password';
      }
      this.setState({
        formError: errCopy,
        showError: true
      })
    });
  }

  confirmSignUp = () => {
    Auth.confirmSignUp(this.state.email, this.state.confirmationCode)
    .then(() => console.log('confirm sign up success'))
    .catch(err => console.log('confirm sign up ERROR: ', err));
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.heading}>Sign up to create an account.</Text>
        <View style={styles.formBox}>
          <TextInput
            style={styles.textInput}
            value={this.state.email}
            onChangeText={value => this.onChangeText('email', value)}
            placeholder="Email"
            autoCapitalize="none"
            autoFocus={true}
            keyboardType="email-address"
          />
          <Text style={styles.inputHelper}>Your email will be your username.</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.password}
            onChangeText={value => this.onChangeText('password', value)}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Text style={styles.inputHelper}>Required: 8 chars, numbers, special chars, upper and lowercase.</Text>
          {this.state.showError ? <Text style={globalStyles.error}>{this.state.formError}</Text> : null}
          <TouchableOpacity
            type="submit"
            style={styles.button}
            onPress={this.signUp}
            title="Sign In"
            accessibilityLabel="Sign up to create an account"
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formBox}>
          <TextInput
            style={styles.textInput}
            value={this.state.confirmationCode}
            onChangeText={value => this.onChangeText('confirmationCode', value)}
            placeholder="Confirmation Code"
          />
          <TouchableOpacity
            type="submit"
            style={styles.button}
            onPress={this.confirmSignUp}
            title="Confirm Sign In"
            accessibilityLabel="Confirm sign up to create your account"
          >
            <Text style={styles.buttonText}>Confirm Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;
