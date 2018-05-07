import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';

import { login } from '../redux/auth';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '' || (this.props.navigation.state.params && this.props.navigation.state.params.error)
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(value) {
    this.setState({username: value});
  }

  handleChangePassword(value) {
    this.setState({password: value});
  }

  handleSubmit() {
    const username = this.state.username;
    const password = this.state.password;
    this.props.login({
      username,
      password
    }, this.props.navigation);
    // clear the state after login for security
    this.setState({
      username: '',
      password: '',
      error: ''
    });
  }

  render() {
   return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <ScrollView>
        <Text style={styles.error}>{this.state.error}</Text>
        <Text style={styles.textLabel}>Username</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={15}
          placeholder="USERNAME"
          placeholderTextColor="tomato"
          value={this.state.username}
          onChangeText={(username) => this.handleChangeUsername(username)}
        />
        <Text style={styles.textLabel}>Password</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={15}
          placeholder="PASSWORD"
          placeholderTextColor="tomato"
          value={this.state.password}
          onChangeText={(password) => this.handleChangePassword(password)}
        />
        <Button
          buttonStyle={styles.button}
          title="Login"
          onPress={this.handleSubmit}
        />
        <Button
          buttonStyle={styles.button}
          title="Sign Up"
          onPress={() => {
            this.props.navigation.navigate('Signup');
            this.setState({
              username: '',
              password: '',
              error: ''
            });
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
  login: (credentials, navigation) => dispatch(login(credentials, navigation))
});

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    flex: 1
  },
  textLabel: {
    fontSize: 20,
    marginTop: 10,
    padding: 10
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 10,
    color: 'tomato',
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 5
  },
  button: {
    backgroundColor: 'gray',
    width: 150,
    height: 40,
    borderRadius: 5,
    alignSelf: 'center'
  },
  error: {
    fontSize: 15,
    color: 'blue',
    marginVertical: 0,
    paddingLeft: 10,
    fontWeight: 'bold'
  }
});
