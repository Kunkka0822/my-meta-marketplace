import Api from "../../global/Api";

const getSession = () => {
    return Api.get('me');
}

const commonApi = {
    getSession
}
export default commonApi