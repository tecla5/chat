# ChatRoom

The ChatRoom encapsulates a `Conversation` taken from `GiftedMessengerExample` app.
The `Conversation` uses a `Messenger` component (our own version of `GiftedMessenger`) to handle messaging.

Currently messages are loaded from static files in `/messages` but this will be replaced by a connection to a server such as *Firebase*
via `rebase` to load the real messages for the room.