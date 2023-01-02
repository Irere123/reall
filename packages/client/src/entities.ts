export type UUID = string;
export type User = {
  username: string;
  online: boolean;
  lastOnline: string;
  id: UUID;
  contributions: number;
  staff: boolean;
  displayName: string;
  bio: string | null;
  avatarUrl: string;
  bannerUrl: string | null;
};
