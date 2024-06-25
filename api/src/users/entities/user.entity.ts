import { Profile } from 'src/profiles/entities/profile.entity';
import { Verification } from 'src/verification/entities/verification.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToOne(() => Verification)
  @JoinColumn()
  verification: Verification;
}
