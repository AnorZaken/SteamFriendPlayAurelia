import { IUserModel } from "./IUserModel";

export class AppUserRowModel {
  constructor(
    readonly appId: bigint,
    readonly appName: string,
    readonly users: IUserModel[]
  ) {}
}
