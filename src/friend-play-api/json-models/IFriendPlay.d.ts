import { IUserInfo } from "./IUserInfo";
import { IFriend } from "./IFriend";
import { IApp } from "./IApp";

export interface IFriendPlay {
    steamUserId: bigint;
    userInfo: IUserInfo;
    friends: IFriend[];
    apps: IApp[];
    success: boolean;
}
