import { StyleSheet } from 'react-native';

export function merge(...styles) {
//  console.log(...styles);
  let styling = Object.assign({}, ...styles);
//  console.log('styling', styling);
  return StyleSheet.create(styling);
} 

export const common = {
  screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },    
  list: {
    flex: 1,
    marginTop: 66, // to start after Navbar
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
}

export default {
  merge: merge,
  common: common
}
