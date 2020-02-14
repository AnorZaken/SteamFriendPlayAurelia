import { FriendPlayRequest as FriendPlayRequest } from "./friend-play-request";
import { FriendPlayResponse } from "./friend-play-response";

export class FriendPlayApi {
  private static readonly _headers: Headers = new Headers({
      'Content-Type' : 'text/plain',
      'Accept' : 'application/json',
      'Origin' : 'localhost'
    });

  public static async fetch(parameters: FriendPlayRequest): Promise<FriendPlayResponse> {
    const proxyurl = "";//"http://localhost:5000/";
    let url = `https://steamfriendplay.azurewebsites.net/api/play?userId=${parameters.userId}&ownershipThreshold=${parameters.ownershipThreshold}&onlyUserOwned=${parameters.onlyUserOwned}&includePlayedFreeGames=${parameters.includePlayedFreeGames}`;
    return fetch(proxyurl + url, {
      method: 'get',
      headers: this._headers
    })
    .then(async response => {
      if (!response.ok) {
        console.log(response);
        return new FriendPlayResponse(false, response.statusText, null);
      }
      else {
        let json = await response.json();
        //console.log(json);
        return new FriendPlayResponse(true, "Success!", json);
      }
    })
    .catch(error => {
      console.log(error.message);
      return new FriendPlayResponse(false, error.message, null);
    });
  }
}
