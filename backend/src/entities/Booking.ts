import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from './Room';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', nullable: false })
  userId!: string;

  @Column({ type: 'integer', nullable: false })
  roomId!: number;

  @Column({ type: 'text', nullable: false })
  timeSlot!: string;

  @Column({ type: 'text', nullable: false })
  date!: string;

  @ManyToOne(() => Room, room => room.bookings)
  @JoinColumn({ name: 'roomId' })
  room!: Room;
}
