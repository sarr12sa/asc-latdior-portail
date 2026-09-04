// Configuration Firebase du projet "Sen Association" (ASC LATDIOR)

const firebaseConfig = {
  apiKey: "AIzaSyCMVoPuDRfKGXiaoPHmW-4ON3iy3D64VBw",
  authDomain: "sen-association.firebaseapp.com",
  projectId: "sen-association",
  storageBucket: "sen-association.firebasestorage.app",
  messagingSenderId: "863575643384",
  appId: "1:863575643384:web:c21cd0f410e796d72ad70d"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
