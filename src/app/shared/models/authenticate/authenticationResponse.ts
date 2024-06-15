import { AppUserDto } from "./appUserDto";

export interface AuthenticationResponse {
    appUserDto: AppUserDto;
    token: string;
}