import { IUserInfo } from "./IUserInfo";

export interface IFriend {
    success: boolean;
    id: bigint;
    value: IUserInfo;
}
