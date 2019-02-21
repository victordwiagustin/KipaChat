/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Root from './src/Root'
import Login from './src/components/Login';

AppRegistry.registerComponent(appName, () => App);
