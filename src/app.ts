import { AppUserRowModel } from "app-user-row/app-user-row-model";
import { Avatar } from "avatar";
import { FriendPlayApi } from "friend-play-api/friend-play-api";
import { FriendPlayRequest } from "friend-play-api/friend-play-request";
import { IApp } from "friend-play-api/json-models/IApp";
import { IFriend } from "friend-play-api/json-models/IFriend";
import { IFriendPlay } from "friend-play-api/json-models/IFriendPlay";
import { IUserInfo } from "friend-play-api/json-models/IUserInfo";
import { IUserModel } from "app-user-row/IUserModel";
import { UserToggleModel } from "user-toggle/user-toggle-model";

export class App {
  private static readonly PLEASE_ENTER_ID_STATUS: string = "Please supply a steamId, e.g. \"76561197990246657\".";

  public statusMsg: string = App.PLEASE_ENTER_ID_STATUS;
  public success: boolean = false;
  public isFetching: boolean = false;

  public userId: string;
  public ownershipThreshold: string;
  public onlyUserOwned: boolean = true;
  public includePlayedFreeGames: boolean = false;

  public users: UserToggleModel[];
  public apps: AppUserRowModel[];

  // TODO: kanske nice att exportera denna func globalt (aurelia feature?)
  public isBigInt(text: string): boolean {
    const regex = /^\d+$/;
    return regex.test(text);
  }

  public async fetchData(): Promise<void> {
    if (this.isBigInt(this.userId))
    {
      this.isFetching = true;
      this.statusMsg = `Fetching data for Steam user ${this.userId}... (Please wait)`;
      this.success = false;
      try {
        const request = new FriendPlayRequest(
          BigInt(this.userId),
          BigInt(this.isBigInt(this.ownershipThreshold) ? this.ownershipThreshold : 2)
          );
        console.log(request);
        const response = await FriendPlayApi.fetch(request);
        console.log(response);
        if (response.success) {
          if(response.data.friends && response.data.apps) {
            this.users = [App._createToggleUser(response.data), ...this._createToggleFriends(response.data?.friends)];
            this.apps = App._createApps(response.data?.apps, this.users);
            console.log(this.users);
            console.log(this.apps);
            this.statusMsg = response.status;
            this.success = true;
          } else {
            this.statusMsg = `Access denied: Cannot read friendslist for user "${
                response?.data?.userInfo ? response.data.userInfo.name : this.userId
              }".`;
          }
        }
      } catch {
        this.statusMsg = "Unknown error occurred :(";
      } finally {
        this.isFetching = false;
      }
    } else {
      this.statusMsg = App.PLEASE_ENTER_ID_STATUS;
    }
  }

  private static _createToggleUser(fp: IFriendPlay): UserToggleModel {
    return !fp
      ? null
      : new UserToggleModel(
        fp.steamUserId, fp.userInfo?.name, App._createAvatar(fp?.userInfo),
        fp.userInfo?.profileUrl, fp.userInfo?.isVisible ?? false);
  }
  
  private _createToggleFriends(friends: IFriend[]): UserToggleModel[] {
    return friends?.map(
      f => new UserToggleModel(
        f.id, f.value?.name, App._createAvatar(f?.value),
        f.value?.profileUrl, f.value?.isVisible ?? false)
      );
  }

  private static _createAvatar(info: IUserInfo): Avatar {
    return new Avatar(info?.avatarFull, info?.avatarSmall, info?.avatarTiny);
  }

  private static _createApps(apps: IApp[], allUsers: IUserModel[]): AppUserRowModel[] {
    return apps?.map(a => new AppUserRowModel(a?.appId, a?.appName, App._createAppUsers(a, allUsers)));
  }

  private static _createAppUsers(app: IApp, allUsers: IUserModel[]): IUserModel[] {
    return app?.userIds.map(id => allUsers.find(u => u.id === id));
  }
}
