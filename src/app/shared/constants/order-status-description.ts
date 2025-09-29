import { OrderStatusEnum } from "../enums/order-status.enum";

export const OrderStatusDescriptions: Record<OrderStatusEnum, string> = {
  [OrderStatusEnum.Pending]: 'Chờ xác nhận',
  [OrderStatusEnum.Processing]: 'Đang xử lý',
  [OrderStatusEnum.Cancelled]: 'Đã hủy',
  [OrderStatusEnum.Failed]: 'Thất bại',
  [OrderStatusEnum.Success]: 'Thành công',
  [OrderStatusEnum.Shipped]: 'Đã giao hàng',
  [OrderStatusEnum.Refunded]: 'Đã hoàn tiền'
};