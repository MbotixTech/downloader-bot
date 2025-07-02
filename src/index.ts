import express, { Request, Response } from "express";
import { config } from "./config/env.js";
import { getFacebookVideo } from "./api/facebook.js";
import { getTiktok } from "./api/tiktok.js";
import { scrapeSingleDoodstreamVideo } from "./api/doodstream.js";
import { getInstagramVideo } from "./api/instagram.js";
import { getTwitterVideo } from "./api/twitter.js";

const app = express();
const PORT = config.PORT;

interface DownloadRequest {
  url?: string;
}

app.get("/api/facebook", async (req: Request<{}, {}, {}, DownloadRequest>, res: Response) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ success: false, error: "Missing URL" });
  }

  try {
    const result = await getFacebookVideo(url);
    if (!result.success) {
      return res.status(500).json(result);
    }
    res.json({
      success: true,
      video_url: result.video_url,
      title: "Mbotix Downloader"
    });
  } catch (error) {
    console.error("❌ Error di /api/facebook:", error);
    const err = error as Error;
    res.status(500).json({ 
      success: false, 
      error: "Internal Server Error", 
      detail: err.message 
    });
  }
});

app.get("/api/tiktok", async (req: Request<{}, {}, {}, DownloadRequest>, res: Response) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "No URL provided." });
  }

  try {
    const result = await getTiktok(url);
    res.json(result);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: "TikTok error", detail: error.message });
  }
});

app.get("/api/doodstream", async (req: Request<{}, {}, {}, DownloadRequest>, res: Response) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ success: false, error: "Missing URL" });
  }

  try {
    const result = await Promise.race([
      scrapeSingleDoodstreamVideo(url),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout 30 detik saat scraping doodstream')), 30000)
      )
    ]);

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.json({
      success: true,
      video_url: result.download_url,
      title: result.title || "Doodstream Video"
    });
  } catch (error) {
    console.error("❌ Error di /api/doodstream:", error);
    const err = error as Error;
    res.status(500).json({ 
      success: false, 
      error: "Gagal scraping doodstream.", 
      detail: err.message 
    });
  }
});

app.get("/api/instagram", async (req: Request<{}, {}, {}, DownloadRequest>, res: Response) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ success: false, error: "Missing URL" });
  }

  try {
    const result = await getInstagramVideo(url);
    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ 
      success: false, 
      error: "Instagram error", 
      detail: err.message 
    });
  }
});

app.get("/api/twitter", async (req: Request<{}, {}, {}, DownloadRequest>, res: Response) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ success: false, error: "Missing URL" });
  }

  try {
    const result = await getTwitterVideo(url);
    if (!result.success) {
      return res.status(500).json(result);
    }
    
    res.json({
      success: true,
      video_url: result.video_url,
      title: result.title || "Twitter Video",
      quality: result.quality,
      available_qualities: result.available_qualities
    });
  } catch (error) {
    console.error("❌ Error di /api/twitter:", error);
    const err = error as Error;
    res.status(500).json({ 
      success: false, 
      error: "Internal Server Error", 
      detail: err.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});
