import TurnStatus from "../EstatusTurnos/statusTurn"
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn } from "typeorm"
import { User } from "./User"

@Entity({
    name : "turnos"
})
export class Turnos {
    @PrimaryGeneratedColumn() 
    id: number

    @Column()
    date: string

    @Column()
    time: string 

    // @Column("integer")
    // userId: number // id del usuario :D

    @Column()
    status: TurnStatus

    @JoinColumn({ name: "userId" }) // 🔥 Esta línea es CLAVE para que no te devuelva null
    // 👇 Acá se relaciona con el usuario
    @ManyToOne(() => User, (user) => user.turnos)
    user: User
}
