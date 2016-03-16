import { StyleSheet } from 'react-native';

export function merge(...styles) {
  let styling = Object.assign({}, ...styles);
  return StyleSheet.create(styling);
} 

// Use for styles debugging
export function mergePrint(name, ...styles) {
  let styling = Object.assign({}, ...styles);
  console.log('StyleSheet:', name, styling);
  return StyleSheet.create(styling);
} 

export function useCommon(...styles) {
  let _styles = styles.reduce((prev, style) => {
    prev[style] = common[style]
    return prev;
  }, {});  
  return merge(_styles);
}

export const common = {
  screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },    
  container: {
    flex: 1,
  },  
  list: {
    flex: 1,
    marginTop: 66, // to start after Navbar
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  listItem: {
    margin: 2,
    backgroundColor:'#bbaa99',
    width:300,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20, 
    borderRadius:10,
    borderColor: 'black',
    borderWidth: 1,   
    flexDirection:'row',
  },  
  icon: {
    width: 40, 
    height: 40,
    marginRight:30,
  }  
}

export default {
  merge: merge,
  common: common
}
