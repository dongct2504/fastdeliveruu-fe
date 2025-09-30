import { DistrictDto } from "./districtDto";

export interface CityDetailDto {
    id: number;
    name: string;
    createdAt: string | null;
    updatedAt: string | null;
    districtDtos: DistrictDto[];
}