import { Platform } from 'react-native';

const constants = {
    IS_ENV_DEVELOPMENT: __DEV__,
    IS_ANDROID: Platform.OS === 'android',
    IS_IOS: Playform.OS === 'ios',
}