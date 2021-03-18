import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';


const Login = () => {
  const [userLoggedIn,setUserLoggedIn] = useContext(userContext);
// if(!firebase.app.auth)
// {
//   firebase.initializeApp(firebaseConfig);

// }
  
if (!firebase.apps.length) {
  firebase.initializeApp({});
}else {
  firebase.app(); // if already initialized, use that one
}

    const handleGoogleSingIn=()=>{
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
      
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */

    const {displayName,email} = result.user;
    const signInGoogle ={name:displayName,email};
    setUserLoggedIn(signInGoogle);
    console.log('user info ',signInGoogle);

    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
    }
    return (
        <div>
          <button onClick={handleGoogleSingIn}>google sign in</button>
        </div>
    );
};

export default Login;