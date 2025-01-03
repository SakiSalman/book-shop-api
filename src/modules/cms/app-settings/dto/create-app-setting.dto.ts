import { IsNotEmpty, isNotEmpty, IsOptional } from "class-validator";

export class CreateAppSettingDto {
    @IsOptional()
    _id : string

    @IsNotEmpty()
    logo : File | string | null

    @IsNotEmpty()
    primaryColor : string

    @IsNotEmpty()
    secondaryColor : string

    @IsNotEmpty()
    grayBg :string
}
