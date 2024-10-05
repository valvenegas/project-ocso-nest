import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/locations/entities/location.entity";

@Entity()
export class Region {
    [x: string]: any;
    @PrimaryGeneratedColumn('increment')
    regionId: number;
    @Column({
        type: "text",
        unique: true
    })
    regionName: string;
    @Column('simple-array')
    regionStates: string[];

    @OneToMany(() => Location, (location) => location.region)
    location: Location[];

}
