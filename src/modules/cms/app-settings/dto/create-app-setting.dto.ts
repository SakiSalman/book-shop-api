import { IsNotEmpty, isNotEmpty, IsOptional } from "class-validator";

export class CreateAppSettingDto {
    @IsOptional()
    _id : string

    @IsNotEmpty()
    logo : File | string | null

    @IsNotEmpty()
    primaryColor : string;

    @IsNotEmpty()
    textColor : string;

    @IsNotEmpty()
    desktopLogoWidth : number

    @IsNotEmpty()
    mobileLogoWidth : number

    @IsNotEmpty()
    desktopFooterLogoWidth : number

    @IsNotEmpty()
    mobileFooterLogoWidth : number

    @IsNotEmpty()
    secondaryColor : string;

    @IsNotEmpty()
    grayBg :string;
}
