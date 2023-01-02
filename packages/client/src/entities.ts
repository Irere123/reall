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
