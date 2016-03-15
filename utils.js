export function sliceList(list, cutOff) {
  // sort messages into earlier and latest
  const count = list.length - cutOff;
  return {
    before: list.slice(0, cutOff),
    after: list.slice(cutOff)
  } 
}

export function titleCase(text) { 
    return text.replace(/\b\w+\b/g, function(word) { 
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(); 
    }); 
}
