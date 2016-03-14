export function sliceList(list, cutOff) {
  // sort messages into earlier and latest
  const count = list.length - cutOff;
  return {
    before: list.slice(0, cutOff),
    after: list.slice(cutOff)
  } 
}
