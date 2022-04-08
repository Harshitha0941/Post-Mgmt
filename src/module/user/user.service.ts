/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtTokenService } from 'src/config/providers/jwtService.service';
import { User } from 'src/entitty/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtToken: JwtTokenService,
        private jwtService: JwtService,
        
      ) {}

      /**
   *
   * @param userDto accepts objects of adduserDto
   * @returns user object , if user is added Successfully
   */
  async addUserDetails(userDto: UserDto): Promise<string> {
    const user: User = new User();
    Object.assign(user, userDto);
    user.display_name = userDto.userName;
    const date = new Date();
    user.created_date = date.toLocaleDateString();
    user.updated_date = date.toLocaleTimeString();
    await this.userRepository.save(user);
    return "user added Successfully";
}
}