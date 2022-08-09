import { ID } from "../../types/common";
import Api from "../../global/Api";
import { PageParam } from "../../types/common";

const getListParcels = (data: PageParam) => {
    return Api.get('api/parcels', data);
};

const retrieve = (parcelId: ID) => {
    return Api.get('api/parcels/' + parcelId);
};

const buy = (parcelId: ID)  => {
    return Api.put(`api/buy/parcels/${parcelId}`)
};

const myParcels = () => {
    return Api.get('api/me/property/parcel');
}

const parcelApi = {
    getListParcels,
    retrieve,
    buy,
    myParcels
};

export default parcelApi;