import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

import { logout } from '../redux/auth';

class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up Main.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button
          buttonStyle={styles.button}
          title="Logout"
          onPress={() => this.props.logout(this.props.navigation)}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: (navigation) => dispatch(logout(navigation))
});

export default connect(null, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
