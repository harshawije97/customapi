import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { CreateUser, UpdateUser } from 'src/core/types';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'TRAINEE') {
    const response = this.userService.getAllUsers(role);
    return {
      message: 'Fetched Successfully',
      status: 200,
      data: response.flat(),
    };
  }

  //   Specific Routes =====
  @Get('trainees')
  getAllTrainees() {
    return [];
  }

  @Get('engineers')
  getAllEngineers() {
    return [];
  }
  //   End of Specific Routes =====

  @Get(':id')
  getUser(@Param('id') id: string) {
    const response = this.userService.getSingleUser(id);
    if (typeof response === 'string') {
      return {
        message: response,
        status: 404,
      };
    }

    return {
      message: 'Request successful',
      status: 200,
      data: response,
    };
  }

  @Post('create')
  createUser(@Body() user: CreateUser) {
    const response = this.userService.createUser(user);
    return response;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUser) {
    const response = this.userService.updateExistingUser(id, user);
    return response;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const response = this.userService.deleteUser(id);
    return {
      message: response,
      status: 200,
    };
  }
}
