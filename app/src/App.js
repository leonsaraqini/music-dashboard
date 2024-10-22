import Home from './page/Home';
import Signup from './page/Signup';
import Login from './page/Login';
import Error404 from './page/Error404';
import Loading from './page/Loading';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import './App.css';
import { getDoc, doc } from 'firebase/firestore';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import EditMusic from './page/EditMusic';
import AddMusic from './page/AddMusic';
import Header from './page/Header';



const App = () => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
    
    if (user) {
        const userDocRef = doc(db, 'users', user.uid); 
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setUserData({ uid: user.uid, ...userDoc.data() }); 
        } else {
          console.log("No such document!");
        }
      } else {
        setUserData(null); 
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading/>;
  }


  return (
    <Router>
      <div>
        {<Header user={user} userData={userData}/>}
        <section>                              
            <Routes>                                                                  
              <Route path="/home" element={<Home userData={userData}/>}/>
               <Route path="/signup" element={user ? <Home userData={userData}/> : <Signup/>}/>
               <Route path="/login" element={user ? <Home userData={userData}/> : <Login/>}/>
               <Route path="/" element={<Home userData={userData}/>}/>
               <Route path="/edit-music/:id" element={<EditMusic />} />
               <Route path='/add-music' element= {<AddMusic/>}></Route>
               <Route path="*" element={<Error404 />} />
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}

export default App;
