# chat

[Presence system: Users online](https://www.firebase.com/blog/2013-06-17-howto-build-a-presence-system.html)

"Imagine you have some exciting news you really want to share with a friend. You jump on your favorite social network, open the friends list, and quickly scan for your friend’s name. There’s a red dot next to it indicating that she’s busy - no matter - this is important! You double click to open a chat window…"

`onDisconnect` - function that tells the Firebase server to do something when it notices a client isn’t connected anymore.

This is exactly what we want - we need to instruct the Firebase server to set the user’s presence boolean to false when it detects that the client went offline:



