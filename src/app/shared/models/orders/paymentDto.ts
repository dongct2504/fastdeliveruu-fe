import { PaymentMethodsEnum } from "../../enums/payment-methods.enum";
import { PaymentStatusEnum } from "../../enums/payment-status.enum";

export interface PaymentDto {
    id: string;
    orderId: string;
    amount: number;
    paymentStatus: PaymentStatusEnum | null;
    paymentMethod: PaymentMethodsEnum | null;
}