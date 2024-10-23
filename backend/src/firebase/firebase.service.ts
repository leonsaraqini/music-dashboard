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

  getDb(): FirebaseFirestore.Firestore {
    return this.db;
  }

}
