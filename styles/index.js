import { StyleSheet } from 'react-native';

export function merge(...styles) {
  console.log(styles[0], styles[1]);
  let styling = Object.assign({}, ...styles);
  console.log('styling', styling);
  return StyleSheet.create(styling);
} 

export const common = {
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
