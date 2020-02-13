export class FriendPlayRequest {
  constructor(
    readonly userId: bigint,
    readonly ownershipThreshold: bigint,
    readonly onlyUserOwned: boolean = true,
    readonly includePlayedFreeGames: boolean = false
    ) {}
}
