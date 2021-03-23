import dayjs, { Dayjs } from 'dayjs';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Dish } from './Dish';

@Entity()
export class Serving {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({
    type: 'timestamp',
    transformer: {
      // Time is stored in database as UTC. We need to append 'Z' so it's parsed correctly by dayjs.
      // Otherwise it would be parsed as local time.
      from: (dateString: string) => dayjs(`${dateString}Z`),
      to: (date: Dayjs) => date,
    },
  })
  date: Dayjs = dayjs();

  @ManyToOne(() => Dish)
  @JoinColumn()
  dish: Dish | null = null;

  @Column()
  dishId: number = 0;

  @Column()
  weight: number = 0;
}
