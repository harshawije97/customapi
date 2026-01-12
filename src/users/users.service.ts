/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDTO } from 'src/core/DTO/update-user.dto';
import { User } from 'src/core/types';
import { data } from 'src/data/sampleData';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class UsersService {
  private users = data;

  constructor(private databaseService: DatabaseService) {}
  // Get all users service
  async getAllUsers(role?: 'INTERN' | 'ENGINEER' | 'TRAINEE') {
    if (role) {
      const roles = this.databaseService.user.findMany({
        where: {
          role,
        },
      });

      if (roles.length === 0) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      return this.databaseService.user.findMany();
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
  createUser(createUserDto: Prisma.UserCreateInput) {
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
