// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck because internet is unpredictable

import { GetTopUserProfilesResponse, User, UserWithFollowInfo } from "..";
import { Connection } from "./raw";

/**
 * A wrapper object created using `wrap()` that can be used to make websocket calls using functions
 */
export type Wrapper = ReturnType<typeof wrap>;

/**
 * Creates a wrapper object that allows you to make websocket calls using functions
 * @param {Connection} connection reference to the websocket connection
 * @returns  {connection} Wrapper object
 */
export const wrap = (connection: Connection) => ({
  connection,

  /**
   * Allows you to subscribe to various pre-defined websocket events
   */
  subscribe: {},

  /**
   * Allows you to call functions that return information about the ws state
   */

  query: {
    search: (
      query: string
    ): Promise<{
      items: Array<User>;
      users: User[];
    }> => connection.sendCall("user:search", { query }),
    getUserProfile: (
      userIdOrUsername
    ): Promise<UserWithFollowInfo | { error: string }> =>
      connection.sendCall("user:get_info", { userIdOrUsername }),
    getTopUserProfiles: (cursor = 0): Promise<GetTopUserProfilesResponse> =>
      connection.sendCall("feed:get_profiles", { cursor }),
    getFollowList: (
      username: string,
      limit = 21,
      cursor = 0
    ): Promise<{
      followers: UserWithFollowInfo[];
      nextCursor: number | null;
    }> =>
      connection.sendCall("user:get_followers", {
        username,
        limit,
        cursor,
      }),
    getMyFollowing: (
      cursor = 0
    ): Promise<{
      users: UserWithFollowInfo[];
      nextCursor: number | null;
    }> =>
      connection.sendCall("user:get_following", {
        cursor,
      }),
  },

  /**
   * Allows you to call functions that mutate the ws state
   */
  mutation: {
    viewProfile: (targetId: string, status = "liked"): Promise<unknown> =>
      connection.sendCast("feed:view", { status, targetId }),
    userFollow: (userId: string): Promise<void> =>
      connection.sendCall("user:follow", { userId }),
    userUnfollow: (userId: string): Promise<void> =>
      connection.sendCall("user:unfollow", { userId }),
  },
});
