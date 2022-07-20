import { ID } from "../../types/common";
import Api from "../../global/Api";
import { PageParam } from "../../types/common";
import { ParcelBoughtRequest } from "../../types/models/parcel";

const getListParcels = (data: PageParam) => {
    return Api.get('api/parcels', null, data);
};

const retrieve = (parcelId: ID) => {
    return Api.get('api/parcels/' + parcelId);
}
const bought = (parcelId: ID, data: ParcelBoughtRequest)  => {
    return Api.put(`api/bought/parcels/${parcelId}`, data)
}
const parcelApi = {
    getListParcels,
    retrieve,
    bought
};

export default parcelApi;