import { WardDto } from "./wardDto";

export interface DistrictDetailDto {
    id: number;
    cityId: number;
    name: string;
    createdAt: string | null;
    updatedAt: string | null;
    wardDtos: WardDto[];
}