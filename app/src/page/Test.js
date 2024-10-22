
import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


const Test = (props) => {
    const navigate = useNavigate();
    const [newItemName, setNewItemName] = useState("");
    
    const {user} = props;

    const [lists, setLists] = useState([]);
    
    // const fetchUserLists = async () => {
         
    //     try {
    //         // Reference to the user's 'lists' collection
    //         const listsCollectionRef = collection(db, "users", user.uid, "lists");
            
    //         // Get all documents (lists) from the 'lists' collection
    //         const querySnapshot = await getDocs(listsCollectionRef);

    //         if(querySnapshot.empty) return;
            
    //         // Map the snapshot to get the list of data
    //         const userLists = querySnapshot.docs.map(doc => ({
    //           id: doc.id,
    //           ...doc.data()
    //         }));
            
    //         setLists(userLists); // Save lists in the state
    //     } catch (error) {
    //         console.error("Error fetching lists: ", error);
    //     }
        
    //     setLoading(false); // Done loading
    //   };

    const fetchUserLists = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/lists/${user.uid}`);
        setLists(response.data);
      } catch (error) {
        console.error('Error fetching lists: ', error);
      }
    };

    // useEffect(() => {
    //     // Fetch lists only if a user is logged in
    //     fetchUserLists();
    //   }, []);

    const handleLogout = () => {               
        
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    // const handleDelete = async (id) =>{
    //     try {
    //           // Reference to the specific list document
    //           const listDocRef = doc(db, "users", user.uid, "lists", id);
    //           await deleteDoc(listDocRef); // Delete the document
      
    //           // Update the UI by removing the deleted list from the state
    //           setLists(lists.filter(list => list.id !== id));
            
    //       } catch (error) {
    //         console.error("Error deleting list: ", error);
    //       }
    // }

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3001/lists/${user.uid}/${id}`);
        setLists(lists.filter(list => list.id !== id));
      } catch (error) {
        console.error('Error deleting list: ', error);
      }
    };

    const handleAdd = async () => {
      try {
        await axios.post(`http://localhost:3001/lists/${user.uid}`, { name: newItemName });
        fetchUserLists();
      } catch (error) {
        console.error('Error adding list: ', error);
      }
    };

    // const handleAdd = async () => {
    //     try{
            
    //             const userRef = doc(db, "users", user.uid);
        
    //             const listsCollectionRef = collection(userRef, "lists");    

    //             await addDoc(listsCollectionRef, {
    //                 name: newItemName
    //             })   
                
    //             fetchUserLists();
            
    //     }catch (error) {
    //         console.error("Error deleting list: ", error);
    //     }
    // }

    // const handleAdd = async () => {
    //     try {
    //         await axios.post(`http://localhost:3001/lists/${user.uid}`, { name: newItemName });
    //         fetchUserLists();  // Refresh lists after adding
    //     } catch (error) {
    //         console.error("Error adding list: ", error);
    //     }
    // };

  

  return (
    <>
            <nav>
                <p>
                    Welcome Home, {user.user}
                </p>

                {lists.length > 0 ? (
        <ul>
            <li>Items:</li>
          {lists.map(list => (
            <li key={list?.id}>
              <strong>{list?.name}</strong>
              <button onClick={() => handleDelete(list?.id)}>remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No lists found.</p>
      )}

        <div>
            <input type="text" onChange={(e)=>setNewItemName(e.target.value)}></input>
            <button onClick={handleAdd}>Add</button>
        </div>

                <div>
                    
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </>
  )
}

export default Test;