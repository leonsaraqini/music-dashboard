import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Music } from './music.interface';

@Injectable()
export class MusicService {
    constructor(private readonly firebaseService: FirebaseService) {}

    async getAllMusic() {
        const musicCollectionRef = this.firebaseService.getDb().collection('music');
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
        const musicDocRef = this.firebaseService.getDb().collection('music').doc(id);

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
        const musicRef = this.firebaseService.getDb().collection('music');
        
        const musicDoc = await musicRef.add({
          Title: musicData.title,
          yearOfRelease: musicData.yearOfRelease,
        });
    
        const artistsRef = musicRef.doc(musicDoc.id).collection('artist');
        const artistPromises = musicData.artists.map(artistName =>
          artistsRef.add({ name: artistName })
        );
    
        await Promise.all(artistPromises);
        return musicDoc.id;
      }

      async deleteMusic(id: string): Promise<void> {
        const musicDocRef = this.firebaseService.getDb().collection('music').doc(id);
        
        const artistCollectionRef = musicDocRef.collection('artist');
        const artistSnapshot = await artistCollectionRef.get();
    
        const deletePromises = artistSnapshot.docs.map((doc) => doc.ref.delete());
        await Promise.all(deletePromises);
    
        await musicDocRef.delete();
      }
}
