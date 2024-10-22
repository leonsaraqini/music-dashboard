import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import axios from 'axios';
import { UpdateMusicDto } from 'src/music/dto/update-music.dto';
import serviceAccount from "src/firebase/serviceAccountKey.json";
import * as path from 'path'
import { Music } from 'src/music/music.interface';

export class FirebaseService {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    const serviceAccount = path.resolve(__dirname, 'serviceAccountKey.json');

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount), 
        databaseURL: "https://test-react-971b9-default-rtdb.firebaseio.com",
      });
    }

    this.db = admin.firestore();
  }

  async getUserLists(userId: string) {
    const listsRef = this.db.collection('users').doc(userId).collection('lists');
    const snapshot = await listsRef.get();
    const lists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return lists;
  }

  async addUserList(userId: string, name: string) {
    const listsRef = this.db.collection('users').doc(userId).collection('lists');
    const newListRef = await listsRef.add({ name });
    return { id: newListRef.id, name };
  }

  async deleteUserList(userId: string, listId: string) {
    const listRef = this.db.collection('users').doc(userId).collection('lists').doc(listId);
    await listRef.delete();
    return { id: listId };
  }

  async verifyIdToken(token: string) {
    return await admin.auth().verifyIdToken(token);
  }

  async createUserInFirestore(email: string, uid: string): Promise<void> {
    const userRef = this.db.collection('users').doc(uid);
    await userRef.set({
      email: email,
      uid: uid,
      role: 'user',  // Assigning default role
      createdAt: new Date().toISOString(),
    });
  }

  async getAllMusic() {
    const musicCollectionRef = this.db.collection('music');
    const musicSnapshot = await musicCollectionRef.get();
    
    const musicList = [];
    
    for (const musicDoc of musicSnapshot.docs) {
      const musicData = musicDoc.data();

      const artistCollectionRef = musicDoc.ref.collection('artist');
      const artistSnapshot = await artistCollectionRef.get();
      const artists = artistSnapshot.docs.map(artistDoc => artistDoc.data().name);

      musicList.push({
        id: musicDoc.id,
        title: musicData.Title,
        yearOfRelease: musicData.yearOfRelease,
        artists,
      });
    }

    return musicList;
  }


  async update(id: string, updateMusicDto: UpdateMusicDto) {
    const musicDocRef = this.db.collection('music').doc(id);

    await musicDocRef.update({
      Title: updateMusicDto.title,
      yearOfRelease: updateMusicDto.yearOfRelease,
    });

    const artistCollectionRef = musicDocRef.collection('artist');
    const artistSnapshot = await artistCollectionRef.get();

    const deletePromises = artistSnapshot.docs.map((doc) => doc.ref.delete());
    await Promise.all(deletePromises);

    const addPromises = updateMusicDto.artists.map((artistName) => {
      return artistCollectionRef.doc(artistName).set({ name: artistName });
    });
    await Promise.all(addPromises);

    return { message: 'Music updated successfully' };
  }

  async addMusic(musicData: Music) {
    const musicRef = this.db.collection('music');
    
    // Add new music document
    const musicDoc = await musicRef.add({
      Title: musicData.title,
      yearOfRelease: musicData.yearOfRelease,
    });

    // Add artists to the 'artists' sub-collection
    const artistsRef = musicRef.doc(musicDoc.id).collection('artist');
    const artistPromises = musicData.artists.map(artistName =>
      artistsRef.add({ name: artistName })
    );

    await Promise.all(artistPromises);
    return musicDoc.id; // Return the ID of the new music document
  }

  async deleteMusic(id: string): Promise<void> {
    const musicDocRef = this.db.collection('music').doc(id);
    
    const artistCollectionRef = musicDocRef.collection('artist');
    const artistSnapshot = await artistCollectionRef.get();

    const deletePromises = artistSnapshot.docs.map((doc) => doc.ref.delete());
    await Promise.all(deletePromises);

    await musicDocRef.delete();
  }
}
