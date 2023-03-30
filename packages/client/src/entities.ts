export type UUID = string;
export type User = {
  username: string;
  online: boolean;
  lastOnline: string;
  id: UUID;
  contributions: number;
  ip: string;
  gender: string;
  goal: string;
  schoolName: string;
  staff: boolean;
  bio: string | null;
  avatarUrl: string;
  bannerUrl: string | null;
  inserted_at: string;
  updated_at: string;
};

export type BaseUser = {
  username: string;
  online: boolean;
  lastOnline: string;
  id: string;
  bio: string;
  displayName: string;
  avatarUrl: string;
  bannerUrl: string;
  numFollowing: number;
  numFollowers: number;
  contributions: number;
  staff: boolean;
};

export type UserWithFollowInfo = BaseUser & {
  followsYou?: boolean;
  youAreFollowing?: boolean;
  iBlockedThem?: boolean;
};
