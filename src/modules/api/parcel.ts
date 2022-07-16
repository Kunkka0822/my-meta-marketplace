import { ID } from "../../types/common";
import Api from "../../global/Api";
import { PageParam } from "../../types/common";

const getListParcels = (data: PageParam) => {
    return Api.get('api/parcels', null, data);
};

const getParcelById = (parcelId: ID) => {
    return Api.get('api/parcels/' + parcelId);
}

const parcelApi = {
    getListParcels,
    getParcelById,
};

export default parcelApi;