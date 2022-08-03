import Api from "../../global/Api"

const get = () => {
    return Api.get('api/token_products');
}
const tokenProductApi = {
    get
}
export default tokenProductApi;