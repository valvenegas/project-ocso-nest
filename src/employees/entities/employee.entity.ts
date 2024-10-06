import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/locations/entities/location.entity";
import { User } from "src/auth/entities/user.entity";
@Entity()

export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string
    @Column('text')
    name: string;
    @Column('text')
    lastName: string;
    @Column('text')
    phoneNumber: string;
    @Column('text',{
        unique: true,
})
    email: string;
    @Column({
        type:('text'),
        nullable:true
    })
    photoUrl: string;
   

    @ManyToOne(() => Location, (location) => location.employee)
    
    @JoinColumn({
        name: "LocationId"
    })
    location: Location;
    
    @OneToOne(()=> User)
    @JoinColumn({
        name: "userId"
    })
    user:User;
}