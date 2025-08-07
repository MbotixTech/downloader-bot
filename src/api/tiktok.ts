import axios, { AxiosResponse } from "axios";
import { TikTokResponse } from "../types/api.js";

interface TikWMApiResponse {
  data?: {
    title: string;
    author: {
      nickname: string;
    };
    play?: string;
    images?: string[];
    size?: number;
  };
}

export async function getTiktok(url: string): Promise<TikTokResponse> {
  try {
    const response: AxiosResponse<TikWMApiResponse> = await axios.get(
      `https://tikwm.com/api/?url=${encodeURIComponent(url)}`
    );
    
    const data = response.data?.data;

    if (!data) {
      throw new Error("Invalid TikTok response");
    }

    if (data.images && data.images.length > 0) {
      return {
        success: true,
        title: data.title,
        author: data.author.nickname,
        images: data.images,
        type: 'image'
      };
    }
    
    if (data.play) {
      return {
        success: true,
        title: data.title,
        author: data.author.nickname,
        video_url: data.play,
        type: 'video'
      };
    }

    throw new Error("No video or images found in TikTok response");
  } catch (err) {
    const error = err as Error;
    return {
      success: false,
      error: "TikTok API failed",
      detail: error.message
    };
  }
}
