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
import { CategoryProvider } from './providers/CategoryProvider';
import { ItemProvider } from './providers/ItemProvider';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
}
firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <UserProfileProvider>
      <RoomProvider>
        <CategoryProvider>
          <ItemProvider>
            <UploadImgProvider>
              <App />
            </UploadImgProvider>
          </ItemProvider>
        </CategoryProvider>
      </RoomProvider>
    </UserProfileProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
