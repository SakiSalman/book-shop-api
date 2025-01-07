import { IsOptional } from "class-validator";

export class CreateHeaderFooterDto {
    @IsOptional()
    searchPlaceholder : string;

    @IsOptional()
    searchButtonText : string;

    @IsOptional()
    headerBgColor : string;

    @IsOptional()
    footerBgColor : string;

    @IsOptional()
    footerCopyrightColor : string;

    @IsOptional()
    copyrightText : string;
}
