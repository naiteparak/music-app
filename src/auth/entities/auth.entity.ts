import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('tokens')
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column({ nullable: true })
  userId: string | null;

  @ManyToOne(() => UserEntity, {
    onDelete: 'SET NULL',
  })
  user: UserEntity;
}
