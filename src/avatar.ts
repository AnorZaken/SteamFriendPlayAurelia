import { bindable } from 'aurelia-framework';
import { IAvatar as IAvatar1 } from 'app-user-row/IAvatar';
import { IAvatar as IAvatar2 } from 'user-toggle/IAvatar';

export class Avatar implements IAvatar1, IAvatar2 {
  @bindable readonly full: string;
  @bindable readonly small: string;
  @bindable readonly tiny: string;
  
  constructor(avatarFull: string, avatarSmall: string, avatarTiny: string) {
    this.full = avatarFull;
    this.small = avatarSmall;
    this.tiny = avatarTiny;
  }
}
