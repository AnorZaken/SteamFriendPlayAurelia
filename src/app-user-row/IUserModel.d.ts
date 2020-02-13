export interface IUserModel {
  readonly id: bigint;
  readonly name: string;
  readonly avatar: IAvatar;
  readonly profileUrl: string;
  readonly isProfilePublic: boolean;
}
