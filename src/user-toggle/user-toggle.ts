import { bindable, customElement } from 'aurelia-framework';
import { UserToggleModel } from './user-toggle-model';

@customElement('user-toggle')
export class UserToggleCustomElement {

  @bindable public user: UserToggleModel;
  @bindable public isSelected: boolean;
  @bindable public selectedchanged: () => void = null;
    
  constructor(user: UserToggleModel){
    this.user = user;
  }

  public activate(params: any): void {
    if (params instanceof UserToggleModel)
      this.user = params;
  }

  public isSelectedChanged(newValue: boolean): void {
    if (newValue !== this.user.isSelected) {
      this.user.isSelected = newValue;
      console.log("Clicked user: " + this.user.name);
      const sc = this.selectedchanged;
      if (sc) {
        console.log("Callback...");
        sc();
      }
    }
  }
}
