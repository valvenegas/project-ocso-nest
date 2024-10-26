import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';
import { Cookies } from './decorators/cookies.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    this.authService.registerUser(createUserDto)
  }

  @Post("login")
  login(@Body() LoginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response, @Cookies() cookies: any) {
     
    const token =  this.authService.loginUser(LoginUserDto);
    response.cookie(TOKEN_NAME, token,{
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
    return this.authService.loginUser(LoginUserDto)


  }

  @Patch("/:email")
  updateUser(@Param('email') userEmail: string, @Body() updateUserDto) {
    return this.authService.updateUser(userEmail, updateUserDto)
  }

}


