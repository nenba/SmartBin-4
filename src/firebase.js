// // import firebase from "firebase/compat/app"
// // import "firebase/compat/auth"
// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getDatabase } from "firebase/database"
// import firebase from "firebase/app";
// import "firebase/firestore";


// // = firebase.initializeApp
// const firebaseConfig = {
//   apiKey: "AIzaSyA7pWrA3PYQFsHzC5Yp8HMwH60Uz9fzazE",
//   authDomain: "wastebindata.firebaseapp.com",
//   databaseURL: "https://wastebindata-default-rtdb.firebaseio.com",
//   projectId: "wastebindata",
//   storageBucket: "wastebindata.appspot.com",
//   messagingSenderId: "293529157067",
//   appId: "1:293529157067:web:b586e967598f0d43150a4e",
//   measurementId: "G-XDSTF88V18"
//   };

// // if (!firebase.apps.length){
// //   firebase.initializeApp(firebaseConfig)
// // }

// const app = initializeApp(firebaseConfig);
// export const database = getDatabase(app);
// export const auth = getAuth(app);
// export const storage = getStorage(app);
// export const db = getFirestore(app);

// const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => {
//   const provider = new GoogleAuthProvider();
//   provider.addScope('email');
//   provider.setCustomParameters({
//     login_hint: 's1920586@usls.edu.ph'
//   });

//   return new Promise((resolve, reject) => {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         console.log(result);
//         resolve(result);
//       })
//       .catch((error) => {
//         console.log(error);
//         reject(error);
//       });
//   });
// };

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword,  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyA7pWrA3PYQFsHzC5Yp8HMwH60Uz9fzazE",
  authDomain: "wastebindata.firebaseapp.com",
  databaseURL: "https://wastebindata-default-rtdb.firebaseio.com",
  projectId: "wastebindata",
  storageBucket: "wastebindata.appspot.com",
  messagingSenderId: "293529157067",
  appId: "1:293529157067:web:b586e967598f0d43150a4e",
  measurementId: "G-XDSTF88V18"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export { auth as default, signInWithEmailAndPassword };

//const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.setCustomParameters({
    login_hint: 's1920586@usls.edu.ph'
  });

  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
