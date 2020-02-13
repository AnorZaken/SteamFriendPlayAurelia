import { bindable, customElement, computedFrom } from 'aurelia-framework';
import { AppUserRowModel } from 'app-user-row/app-user-row-model';
import { IUserModel } from 'app-user-row/IUserModel';

@customElement('app-user-list')
export class AppUserListCustomElement {

  @bindable public apps: AppUserRowModel[];
  @bindable public userfilter: IUserModel[];
  private _matching: AppUserRowModel[];
  private _nonmatching: AppUserRowModel[];
  
  @computedFrom('_matching')
  public get matching(): AppUserRowModel[] {
    return this._matching;
  }
  
  @computedFrom('_nonmatching')
  public get nonmatching(): AppUserRowModel[] {
    return this._nonmatching;
  }

  public appsChanged(newValue: AppUserRowModel[]): void {
    console.log("List of apps changed:");
    console.log(newValue);
    this.updateMatchFilters();
  }
  public userfilterChanged(newValue: IUserModel[]): void {
    console.log("Apps list user filter changed...");
    this.updateMatchFilters();
  }

  public updateMatchFilters(): void {
    console.log("Updating apps filters...");
    const apps = this.apps;
    const filter = this.userfilter;
    if (!apps) {
      console.log("Apps list empty!");
      this._matching = [];
      this._nonmatching = [];
    } else if (filter?.length > 0) {
      this._updateMatchFilters(apps, filter);
      console.log("Apps list filtered:");
      console.log(this._matching);
    } else {
      console.log("Filter empty, matching all apps.");
      this._matching = apps;
      this._nonmatching = [];
    }
  }

  private _updateMatchFilters(apps: AppUserRowModel[], requiredUsers: IUserModel[]): void {
    const matching: AppUserRowModel[] = [];
    const nonmatching: AppUserRowModel[] = [];
    for (const app of apps) {
      (AppUserListCustomElement._matches(app, requiredUsers)
        ? matching
        : nonmatching
      ).push(app);
    }
    this._matching = matching;
    this._nonmatching = nonmatching;
  }

  private static _matches(app: AppUserRowModel, requiredUsers: IUserModel[]): boolean {
    // (ignores null-values in the filter: '!r')
    return requiredUsers.every(r => !r || app.users.some(u => u?.id === r.id));
  }
}
