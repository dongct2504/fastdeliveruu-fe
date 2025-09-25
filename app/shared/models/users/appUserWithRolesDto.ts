export interface AppUserWithRolesDto {
    id: string;
    userName: string;
    email: string;
    imageUrl: string;
    isLocked: boolean;
    roles: string[];
}