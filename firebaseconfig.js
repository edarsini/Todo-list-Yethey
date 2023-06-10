// Firebase Configurations
const firebaseConfig = {
    apiKey: "AIzaSyCAhrqyYLt1Xf-EXCAA-rkAROpB8h9PJvg",
    authDomain: "task-it-aa92b.firebaseapp.com",
    databaseURL:
      "https://task-it-aa92b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "task-it-aa92b",
    storageBucket: "task-it-aa92b.appspot.com",
    messagingSenderId: "704129947151",
    appId: "1:704129947151:web:65be9515384b4b0462357a",
    measurementId: "G-231G5FKB49",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize Realtime Database
  const db = firebase.database();
  const tasksRef = db.ref("Tasks");

  const priorityValues = {
  high: 3,
  medium: 2,
  low: 1,
};