import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from './Booking';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', nullable: false })
  name!: string;

  @Column({ type: 'integer', nullable: false })
  capacity!: number;

  @OneToMany(() => Booking, booking => booking.room)
  bookings!: Booking[];
}
