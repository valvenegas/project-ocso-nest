import { ArrayNotEmpty, IsArray, IsObject, IsString, MaxLength } from "class-validator"
import { Location} from "../entities/location.entity"
import { Region } from "src/regions/entities/region.entity"

export class CreateLocationDto extends Location {
    @IsString()
    @MaxLength(35)
    locationName: string
    @IsString()
    @MaxLength(160)
    locationAddress: string
    @IsArray()
    @ArrayNotEmpty()
    locationLating: number[]
    @IsObject()
    region: Region;

}
