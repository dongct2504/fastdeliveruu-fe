export interface PaymentResponse {
    isSuccess: boolean
    orderId: string
    totalAmount: number
    transactionId: string
    paymentMethod: string
    orderDescription: string
    vnpayResponseCode: string
    token: string
}
