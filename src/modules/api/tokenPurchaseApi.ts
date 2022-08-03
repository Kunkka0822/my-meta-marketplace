import Api from "../../global/Api"

const step1 = (tokenProductId: string) => {
    return Api.post('api/purchase_token/step1', {
        tokenProductId
    })
}
const step2 = (tokenPurchaseId: string, paymentMethodId: string) => {
    return Api.post('api/purchase_token/step2', {
        tokenPurchaseId,
        paymentMethodId
    })
}
const tokenPurchaseApi = {
    step1,
    step2
}
export default tokenPurchaseApi;