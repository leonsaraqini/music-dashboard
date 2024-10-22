import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; uid: string }) {
    await this.firebaseService.createUserInFirestore(body.email, body.uid);
    return { message: 'User created successfully' };
  }
}