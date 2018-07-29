import * as firebase from 'firebase';

const firebaseConfig = {
    
    apiKey: "AIzaSyBB7SIt5Fwo9XpJYPtPlO5pk6GjWNY9IXA",
    authDomain: "red-carpet-logistic.firebaseapp.com",
    databaseURL: "https://red-carpet-logistic.firebaseio.com",
    projectId: "red-carpet-logistic",
    storageBucket: "red-carpet-logistic.appspot.com",
    messagingSenderId: "616552161564"
    /*
    apiKey: "AIzaSyD4doSFFYczvCp2AuI1q3vGCJX1VeKjpC0",
    authDomain: "rcl-staging.firebaseapp.com",
    databaseURL: "https://rcl-staging.firebaseio.com",
    projectId: "rcl-staging",
    storageBucket: "rcl-staging.appspot.com",
    messagingSenderId: "130808718849"
*/

};

export const firebaseApp = firebase.initializeApp(firebaseConfig);