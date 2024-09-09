import { PlantedCrops } from '../../planted-crops/entities/planted-crops.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('producers')
export class Producer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 32 })
  document: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  farm: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  area: number;

  @Column({ nullable: false })
  farmableArea: number;

  @Column({ nullable: false })
  vegetationArea: number;

  @ManyToMany(() => PlantedCrops, (plantedCrop) => plantedCrop.producers)
  @JoinTable({
    name: 'planted_crops_producers',
    joinColumn: {
      name: 'producer_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'planted_crop_id',
      referencedColumnName: 'id',
    },
  })
  planted_crops: PlantedCrops[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
