import { bindable } from 'aurelia-framework';
import { IAvatar } from './IAvatar';

export class UserToggleModel {
  @bindable readonly id: bigint;
  @bindable readonly name: string;
  @bindable readonly avatar: IAvatar;
  @bindable readonly profileUrl: string;
  @bindable readonly isProfilePublic: boolean;
  public isSelected: boolean = false;
  
  constructor(id: bigint, name: string, avatar: IAvatar, profileUrl: string, isProfilePublic: boolean) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.profileUrl = profileUrl;
    this.isProfilePublic = isProfilePublic;
  }
}
