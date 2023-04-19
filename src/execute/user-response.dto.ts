export class WillBeGenerateDto {
    findAll: boolean = false;
    findOne: boolean = false;
    create: boolean = false;
    update: boolean = false;
    delete: boolean = false;
}

export class UserResponseDto {
    targetTable: string;
    targetFilePath: string;
    willBeGenerate: WillBeGenerateDto;
}
