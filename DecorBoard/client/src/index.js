import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { App } from './App';
import { UserProfileProvider } from './providers/UserProfileProvider';
import { RoomProvider } from './providers/RoomProvider';
import { UploadImgProvider } from './providers/UploadImgProvider';
import { ItemProvider } from './providers/ItemProvider';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
}
firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <UserProfileProvider>
      <RoomProvider>
        <ItemProvider>
          <UploadImgProvider>
            <App />
          </UploadImgProvider>
        </ItemProvider>
      </RoomProvider>
    </UserProfileProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
