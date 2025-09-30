export interface AvailableShipperOrderDto {
  id: string;
  orderDate: string | null;
  paymentMethod: number | null;
  totalAmount: number;
  orderStatus: number | null;
  latitude: number;
  longitude: number;
}
