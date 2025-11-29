import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const saved = await this.userRepository.save(user);
    const { password, ...result } = saved;
    return { success: true, message: 'User created successfully', data: result };
  }

  async findAll(): Promise<any> {
    const users = await this.userRepository.find();
    const result = users.map(user => {
      const { password, ...u } = user;
      return u;
    });
    return { success: true, data: result };
  }

  async findOne(id: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      const { password, ...result } = user;
      return { success: true, data: result };
    } else {
      return { success: false, message: 'User not found' };
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const result = await this.userRepository.update(id, updateUserDto);
    if (result.affected && result.affected > 0) {
      const updated = await this.findOne(id);
      return { success: true, message: 'User updated successfully', data: updated.data };
    } else {
      return { success: false, message: 'User not found' };
    }
  }

  async remove(id: string): Promise<any> {
    const result = await this.userRepository.delete(id);
    if (result.affected && result.affected > 0) {
      return { success: true, message: 'User deleted successfully' };
    } else {
      return { success: false, message: 'User not found' };
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
