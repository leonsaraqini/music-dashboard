import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class ListsService {
    constructor(private readonly firebaseService: FirebaseService) {}

    async getUserLists(userId: string) {
        const listsRef = this.firebaseService.getDb().collection('users').doc(userId).collection('lists');
        const snapshot = await listsRef.get();
        const lists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return lists;
      }
    
      async addUserList(userId: string, name: string) {
        const listsRef = this.firebaseService.getDb().collection('users').doc(userId).collection('lists');
        const newListRef = await listsRef.add({ name });
        return { id: newListRef.id, name };
      }
    
      async deleteUserList(userId: string, listId: string) {
        const listRef = this.firebaseService.getDb().collection('users').doc(userId).collection('lists').doc(listId);
        await listRef.delete();
        return { id: listId };
      }
}
