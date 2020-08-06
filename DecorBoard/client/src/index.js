import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import * as serviceWorker from './serviceWorker';
import { App } from './App';
import { UserProfileProvider } from './providers/UserProfileProvider';
import { RoomProvider } from './providers/RoomProvider';
import { ItemProvider } from './providers/ItemProvider';
import { CategoryProvider } from './providers/CategoryProvider';
import { UploadImgProvider } from './providers/UploadImgProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
}
firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <UserProfileProvider>
      <RoomProvider>
        <ItemProvider>
          <CategoryProvider>
            <UploadImgProvider>
              <App />
            </UploadImgProvider>
          </CategoryProvider>
        </ItemProvider>
      </RoomProvider>
    </UserProfileProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()