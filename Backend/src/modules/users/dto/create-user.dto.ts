export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  cc?: string;
  url_photo?: string;
}
