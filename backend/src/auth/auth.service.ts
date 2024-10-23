import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthService {
    constructor(private readonly firebaseService: FirebaseService) {}

    async createUserInFirestore(email: string, uid: string): Promise<void> {
        const userRef = this.firebaseService.getDb().collection('users').doc(uid);
        await userRef.set({
          email: email,
          uid: uid,
          role: 'user', 
          createdAt: new Date().toISOString(),
        });
    }
}
