import { Injectable } from '@nestjs/common';
import { CreateUser, UpdateUser, User } from 'src/core/types';
import { data } from 'src/data/sampleData';

@Injectable()
export class UsersService {
  private users = data;
  // Get all users service
  getAllUsers(role?: 'INTERN' | 'ENGINEER' | 'TRAINEE') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  // Get single user by ID
  getSingleUser(id: string) {
    const response = this.users.find((user) => user.id === id);
    if (typeof response === 'undefined') {
      return 'No user found';
    }

    return response;
  }

  // Create new user
  createUser(user: CreateUser) {
    // Validation
    const id = crypto.randomUUID();
    const newUser: User = {
      id: id,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  // Update user
  updateExistingUser(id: string, updateUser: UpdateUser) {
    const checkUser = this.users.find((user) => user.id === id);
    if (typeof checkUser === 'undefined') {
      return 'Unknown user. Either user is already deleted or invalid';
    }

    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUser };
      }
      return user;
    });

    return this.getSingleUser(id);
  }

  // Delete user
  deleteUser(id: string) {
    const getUser = this.getSingleUser(id);
    if (typeof getUser === 'string') {
      return 'Unknown user. Either user is already deleted or invalid';
    }

    this.users = this.users.filter((user) => user.id !== id);

    return 'User deleted successfully';
  }
}
