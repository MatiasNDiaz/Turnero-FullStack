import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from "typeorm"
import { Credentials } from "./Credenciales"
import { Turnos } from "./Turnos"


@Entity({
    name: "usuarios"
}) 
export class User{
    @PrimaryGeneratedColumn() 
    id: number
    
    @Column({ length: 100, type: "varchar", nullable: false}) 
    name: string
    
    @Column({ length: 100, type: "varchar", nullable: false, unique: true}) //unico
    email: string
    
    @Column()
    birthdate: string
    
    @Column({type: "integer", unique: true, nullable: false}) //unico
    nDni: number
    
    @OneToOne(() => Credentials, {cascade: true})
    @JoinColumn({ name: 'credentialsId' })
    credentialsId: Credentials

    @OneToMany(() => Turnos, (turno) => turno.user)
    turnos: Turnos[]
};

