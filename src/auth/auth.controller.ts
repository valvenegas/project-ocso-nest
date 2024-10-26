import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto){
    this.authService.registerUser(createUserDto)
  }

  @Post("login")
  login(@Body() LoginUserDto: LoginUserDto){
  
    return this.authService.loginUser(LoginUserDto)
  }

  @Patch("/:email")
  updateUser(@Param('email') userEmail: string,  @Body() updateUserDto){
    return this.authService.updateUser(userEmail, updateUserDto)
  }

}
