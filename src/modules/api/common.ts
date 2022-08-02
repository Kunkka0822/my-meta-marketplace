import Api from "../../global/Api";

const getSession = () => {
    return Api.get('api/metastore-session');
}
const signinWithHash = (hash: string) => {
    return Api.post('api/signin-hash', { hash })
}
const commonApi = {
    getSession,
    signinWithHash
}
export default commonApi