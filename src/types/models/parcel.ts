import { ID } from "../common"

export type ParcelData = {
    id: ID;
    image: string;
    address: string;
    square: number;
    price: number;
    ownerAddress: string;
    contractAddress: string;
    tokenId: ID;
    onSale: number;
}