export interface RestaurantHourDto {
    id: string;
    restaurantId: string;
    weekenDay: string | null;
    startTime: string | null;
    endTime: string | null;
}