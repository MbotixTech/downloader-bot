export interface ApiResponse {
  success: boolean;
  error?: string;
  detail?: string;
}

export interface VideoResponse extends ApiResponse {
  video_url?: string;
  download_url?: string;
  title?: string;
  thumbnail?: string;
  quality?: string;
  available_qualities?: QualityOption[];
}

export interface QualityOption {
  quality: string;
  url: string;
}

export interface TikTokResponse extends ApiResponse {
  title?: string;
  author?: string;
  video_url?: string;
  images?: string[];
  type?: 'video' | 'image';
}

export interface TwitterResponse extends VideoResponse {
  available_qualities?: QualityOption[];
}

export interface FacebookResponse extends VideoResponse {}

export interface InstagramResponse extends VideoResponse {}

export interface DoodstreamResponse extends VideoResponse {}
