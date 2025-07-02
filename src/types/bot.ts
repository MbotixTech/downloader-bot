export interface UserInfo {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface BroadcastState {
  waiting: boolean;
  messageId: number;
}

export interface LastAction {
  type: string;
  link: string;
  title: string;
}

export interface FailedUser {
  id: number;
  username: string;
  fullName: string;
}

export type Platform = 'tiktok' | 'facebook' | 'instagram' | 'twitter' | 'doodstream';

export interface PlatformDetection {
  platform: Platform | null;
  url: string | null;
}
