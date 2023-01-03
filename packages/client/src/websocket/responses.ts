import { User } from "..";

export type GetTopUserProfilesResponse = {
  profiles: User[];
  nextCursor: number | null;
};
