export function sliceList(list, cutOff) {
  // sort messages into earlier and latest
  const count = list.length - cutOff;
  return {
    before: messages.slice(0, earlierMsgCount),
    after: messages.slice(earlierMsgCount)
  } 
}
