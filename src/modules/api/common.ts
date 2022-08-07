import Api from "../../global/Api";

const getSession = () => {
    return Api.get('api/metastore-session');
}
const signinWithHash = (hash: string) => {
    return Api.post('api/signin-hash', { hash })
}
const getKycStatus = () => {
    return Api.get('api/me/tilia_kyc_status');
}
const commonApi = {
    getSession,
    signinWithHash,
    getKycStatus
}
export default commonApi