import { Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm"
import { User } from "./User"

@Entity({
    name : "credenciales"
})
export class Credentials{
    @PrimaryGeneratedColumn() 
    id: number

    @Column({length: 100, type: "varchar", unique:true, nullable:false}) //unique
    username: string

    @Column({length: 100, type: "varchar", nullable: false})
    password: string

    @OneToOne(()=> User)
    user: User
}