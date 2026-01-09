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

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'TRAINEE') {
    if (role) {
      return {
        roles: [],
      };
    }
    return [];
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
    return {
      message: 'Request successful',
      status: 200,
      data: id,
    };
  }

  @Post('create')
  createUser(@Body() user: object) {
    return {
      message: 'Request successful',
      status: 200,
      data: user,
    };
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() user: object) {
    return {
      message: 'Request successful',
      status: 200,
      data: { id, ...user },
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return {
      message: 'Request successful',
      status: 200,
      data: id,
    };
  }
}
