import { LocalUserDto } from "./localUserDto";

export interface AuthenticationResponse {
    localUserDto: LocalUserDto;
    token: string;
}