import { IWallet } from 'src/interfaces/store/data/wallet.interface';
import { ISkill } from './skills.interface';

export interface IUser {
  id?: string;
  wallet?: IWallet;
  type?: string;
  name?: string;
  username?: string;
}

export interface IUsers {
  name: string;
  username: string;
  UserProfile: [
    {
      bio: string;
      image?: string;
      skills: ISkill[];
      location: string;
      createdAt: Date;
    }
  ];
}
