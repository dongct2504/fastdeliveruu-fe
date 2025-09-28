export interface PaymentResponse {
    isSuccess: boolean
    orderId: string
    totalAmount: number
    transactionId: string
    paymentMethod: number
    orderDescription: string

    vnpayResponseCode: string
    vnpayToken: string

    vnpayReturnUrl: string
}
