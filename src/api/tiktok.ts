import axios, { AxiosResponse } from "axios";
import { TikTokResponse } from "../types/api.js";

interface TikWMApiResponse {
  data?: {
    title: string;
    author: {
      nickname: string;
    };
    play: string;
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

    return {
      success: true,
      title: data.title,
      author: data.author.nickname,
      video_url: data.play
    };
  } catch (err) {
    const error = err as Error;
    return {
      success: false,
      error: "TikTok API failed",
      detail: error.message
    };
  }
}
