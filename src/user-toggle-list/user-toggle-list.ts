import { bindable, customElement } from 'aurelia-framework';
import { UserToggleModel } from 'user-toggle/user-toggle-model';

@customElement('user-toggle-list')
export class UserToggleListCustomElement {
    
  @bindable public users: UserToggleModel[];
  @bindable public selected: UserToggleModel[] = [];

  public updateSelection(changed: UserToggleModel): void {
    console.log(`Selection changed for user: ${changed?.name} (${changed?.isSelected ? "selected" : "deselected"})`);
    this.selected = this.users.filter(u => u.isSelected);
    console.log(`Selected users: ${this.selected.length}`);
  }
}
