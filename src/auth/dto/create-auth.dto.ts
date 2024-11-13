import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    readonly name: string;
  
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    readonly email: string;
  
    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    password: string;
  
    @IsOptional()
    @IsEnum(UserRole, { message: 'Role must be either admin, customer, or author' })
    readonly role: UserRole;
    
    @IsOptional()
    books : string[]
}
