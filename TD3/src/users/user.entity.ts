import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", width: 255 })
    first_name: string;

    @Column({ type: "varchar", width: 255 })
    last_name: string;

    @Column({ type: "varchar", width: 255, unique: true, })
    email: string;

    @Column({ type: "varchar", width: 255 })
    password: string;

    @Column({ type: "varchar", width: 255, unique: true, })
    phone: string;

    @Column({ type: "varchar", width: 255, unique: true, })
    username: string;

    @Column({ type: "varchar", width: 255 })
    pfp_url: string;

    @CreateDateColumn({ type: "timestamp", width: 6, default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", width: 6, default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

}
