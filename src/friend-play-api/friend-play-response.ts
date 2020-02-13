import { IFriendPlay } from "./json-models/IFriendPlay";

export class FriendPlayResponse {
  constructor(
    readonly success: boolean,
    readonly status: string,
    readonly data: IFriendPlay
  ) {}
}
