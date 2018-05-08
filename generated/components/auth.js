// React-Native's version of local storage
import { AsyncStorage } from 'react-native';

export const KEY = 'create-react-native-app-redux-auth-demo-key';

// Set storage to hold key as TRUE
export const onSignIn = () => AsyncStorage.setItem(KEY, 'true');

// Set storage to hold user data
export const setStorage = (data) => AsyncStorage.setItem('data', JSON.stringify(data));

// If user signs out, remove TRUE key
export const onSignOut = () => AsyncStorage.removeItem(KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
