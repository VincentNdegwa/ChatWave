import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  OTP: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
