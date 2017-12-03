const admin = require('firebase-admin');

const serviceAccount = require('./firestoring-firebase-adminsdk-bwl1v-cfdee1cc2f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: 'AIzaSyAnczqINTOIlorrzHbSogUsJCS17Ym6Xxo',
  authDomain: 'firestoring.firebaseapp.com',
  projectId: 'firestoring'
});

firebase
  .firestore()
  .enablePersistence()
  .then(function() {
    // Initialize Cloud Firestore through firebase
    let database = firebase.firestore();
  })
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      console.log('Multiple Tabs Open');
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      console.log('No Browser Support');
    }
  });

// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// });

let database = admin.firestore();

const docRef = database.collection('users').doc('alovelace');

const setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});

const aTuringRef = database.collection('users').doc('aturing');

const setAlan = aTuringRef.set({
  first: 'Alan',
  middle: 'Mathison',
  last: 'Turing',
  born: 1912
});

database
  .collection('users')
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

const cityData = { name: 'Los Angeles', state: 'CA', country: 'USA' };

// Add a new document in collection "cities" with ID 'DC'
const setCityDoc = database
  .collection('cities')
  .doc('LA')
  .set(cityData);

// The option to merge data is not yet available for Node.js. Instead, call the
// update method and pass the option to create the document if it's missing.
const cityRef = database.collection('cities').doc('BJ');

var setWithOptions = cityRef.set(
  {
    capital: true
  },
  { merge: true }
);

const sampleData = {
  stringExample: 'Hello, World!',
  booleanExample: true,
  numberExample: 3.14159265,
  dateExample: new Date('December 10, 1815'),
  arrayExample: [5, true, 'hello'],
  nullExample: null,
  objectExample: {
    a: 5,
    b: true
  }
};

const setSampleDoc = database
  .collection('data')
  .doc('one')
  .set(sampleData);

// // setting
// database
//   .collection('cities')
//   .doc('new-city-id')
//   .set(sampleData);

// Add a new document with a generated id.
var addDoc = database
  .collection('cities')
  .add({
    name: 'Tokyo',
    country: 'Japan'
  })
  .then(ref => {
    console.log('Added document with ID: ', ref.id);
  });
