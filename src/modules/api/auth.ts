import Api from "../../global/Api"
import { LoginRequest } from "../../types/requests/auth"

const login = (data: LoginRequest) => {
    return Api.post('/api/signin', data);
}
const authApi = {
    login
}
export default authApi