# messages

The `/messages` folder encapsulates all communication to the server. Adapters can be created for testing or to connect to different backends.
Currently we have: 
- `MockAdapter` which uses mock data from a file
- `FirebaseAdapter` which connect to a Firebase db and fetches/stores messages from there