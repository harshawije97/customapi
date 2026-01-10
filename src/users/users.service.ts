import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/core/DTO/create-user.dto';
import { UpdateUserDTO } from 'src/core/DTO/update-user.dto';
import { User } from 'src/core/types';
import { data } from 'src/data/sampleData';

@Injectable()
export class UsersService {
  private users = data;
  // Get all users service
  getAllUsers(role?: 'INTERN' | 'ENGINEER' | 'TRAINEE') {
    if (role) {
      const roles = this.users.filter((user) => user.role === role);

      if (roles.length === 0) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      return roles;
    }

    return this.users;
  }

  // Get single user by ID
  getSingleUser(id: string) {
    const response = this.users.find((user) => user.id === id);
    if (typeof response === 'undefined') {
      throw new NotFoundException('No user found');
    }

    return response;
  }

  // Create new user
  createUser(createUserDto: CreateUserDTO) {
    // Validation
    const id = crypto.randomUUID();
    const newUser: User = {
      id: id,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  // Update user
  updateExistingUser(id: string, updateUserDto: UpdateUserDTO) {
    const checkUser = this.users.find((user) => user.id === id);
    if (typeof checkUser === 'undefined') {
      throw new NotFoundException(
        'Unknown user. Either user is already deleted or invalid',
      );
    }

    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.getSingleUser(id);
  }

  // Delete user
  deleteUser(id: string) {
    const getUser = this.getSingleUser(id);
    if (typeof getUser === 'string') {
      throw new NotFoundException(
        'Unknown user. Either user is already deleted or invalid',
      );
    }

    this.users = this.users.filter((user) => user.id !== id);

    return 'User deleted successfully';
  }
}
