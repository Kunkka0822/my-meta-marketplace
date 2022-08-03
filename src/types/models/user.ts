import { ID } from "../common"


export type BalancesType = {
    usd: number;
    mmcConvertible: number;
    mmcSpendable: number;
};

export type UserData = {
    id: ID,
    name: string,
    balances: BalancesType
}