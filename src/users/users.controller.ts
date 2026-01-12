import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from 'src/core/DTO/update-user.dto';
import { Prisma } from 'src/generated/prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'TRAINEE') {
    const response = this.userService.getAllUsers(role);
    return response;
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
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    const response = this.userService.getSingleUser(id);

    return {
      message: 'Request successful',
      status: 200,
      data: response,
    };
  }

  @Post('create')
  createUser(@Body(ValidationPipe) createUserDto: Prisma.UserCreateInput) {
    const response = this.userService.createUser(createUserDto);
    return response;
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDTO,
  ) {
    const response = this.userService.updateExistingUser(id, updateUserDto);
    return response;
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const response = this.userService.deleteUser(id);
    return {
      message: response,
      status: 200,
    };
  }
}
