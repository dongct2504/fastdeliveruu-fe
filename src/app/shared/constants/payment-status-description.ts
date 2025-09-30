import { PaymentStatusEnum } from "../enums/payment-status.enum";

export const PaymentStatusDescriptions: Record<PaymentStatusEnum, string> = {
  [PaymentStatusEnum.Pending]: 'Chờ thanh toán',
  [PaymentStatusEnum.Processing]: 'Đang xử lý',
  [PaymentStatusEnum.Cancelled]: 'Đã hủy',
  [PaymentStatusEnum.Failed]: 'Thanh toán thất bại',
  [PaymentStatusEnum.Approved]: 'Đã thanh toán',
  [PaymentStatusEnum.Shipped]: 'Đã giao hàng',
  [PaymentStatusEnum.Refunded]: 'Đã hoàn tiền',
  [PaymentStatusEnum.DelayedPayment]: 'Thanh toán chậm'
};
