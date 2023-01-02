// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck because internet is unpredictable

import { User } from "..";
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
    getUserProfile: (userIdOrUsername): Promise<User | { error: string }> =>
      connection.sendCall("user:get_info", { userIdOrUsername }),
  },

  /**
   * Allows you to call functions that mutate the ws state
   */
  mutation: {},
});
