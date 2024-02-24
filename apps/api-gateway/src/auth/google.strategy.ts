import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;
    console.log(name);
    console.log(accessToken);

    const providerId = id;
    const email = emails[0].value;
    console.log(providerId);
    console.log(email);

    const userName = name.familyName
      ? name.familyName + name.givenName
      : name.givenName;
    const user: User = await this.userService.findByEmailOrSave(
      email,
      userName,
      providerId,
    );

    return user;
  }
}
