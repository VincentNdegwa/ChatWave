import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './Profile.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone_number: string;

  @Column()
  password: string;

  @Column()
  created_at: Date;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
