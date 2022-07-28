import { ID } from "../../types/common";
import Api from "../../global/Api";
import { PageParam } from "../../types/common";

const getListParcels = (data: PageParam) => {
    return Api.get('api/parcels', null, data);
};

const retrieve = (parcelId: ID) => {
    return Api.get('api/parcels/' + parcelId);
}
const buy = (parcelId: ID)  => {
    return Api.put(`api/buy/parcels/${parcelId}`)
}
const parcelApi = {
    getListParcels,
    retrieve,
    buy
};

export default parcelApi;