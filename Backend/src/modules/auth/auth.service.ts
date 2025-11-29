import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('Validating user:', email, pass);
    const user = await this.usersService.findByEmail(email);
    console.log('User found:', user ? 'yes' : 'no');
    if (user) {
      console.log('Stored password:', user.password);
      const isMatch = await bcrypt.compare(pass, user.password);
      console.log('Password match:', isMatch);
      if (!isMatch) {
        const inputHash = await bcrypt.hash(pass, 10);
        console.log('Input password hash:', inputHash);
      }
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async register(userData: any): Promise<any> {
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    const newUser = await this.usersService.create(userData);
    const { password, ...result } = newUser.data;
    return { success: true, message: 'User registered successfully', user: result };
  }

  async login(user: any) {
    console.log('AuthService login called with user:', user);
    const payload = { email: user.email, sub: user.id };
    return {
      success: true,
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
    };
  }
}