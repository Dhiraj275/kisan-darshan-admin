import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import firebase from './firebase';
import AdminPanel from './Pages/AdminPanel';
import Login from './Pages/Login';
function App() {
  const [firebaseUserData, setFirebaseUserData] = useState(null)

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setFirebaseUserData(user)
    }
    else {
      setFirebaseUserData(undefined)
    }
  })
  if (firebaseUserData === undefined) {
    return (
      <>
        <Login />
        <Redirect to="/" />
      </>
    )

  }
  else {
    return <AdminPanel />
  }
}

export default App;
