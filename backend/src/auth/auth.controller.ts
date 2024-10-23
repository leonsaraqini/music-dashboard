import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; uid: string }) {
    await this.authService.createUserInFirestore(body.email, body.uid);
    return { message: 'User created successfully' };
  }
}