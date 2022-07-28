import { ID } from "../common"
import { UserData } from "./user";

export enum PropertyStatus {
    UNMINTED = 'UNMINTED',
    OWNED = 'OWNED',
    ONSALE = 'ONSALE',
    SECURING = 'SECURING'
};

export type ParcelData = {
    id: ID;
    image?: string;
    address?: string;
    square?: number;
    price: number;
    ownerAddress?: string;
    contractAddress?: string;
    tokenId?: string;
    handleId: string;
    status: PropertyStatus,
    owner?: UserData
}
