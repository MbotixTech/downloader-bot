import puppeteer, { Browser, Page, Frame } from "puppeteer";
import { DoodstreamResponse } from "../types/api.js";

export async function scrapeSingleDoodstreamVideo(url: string): Promise<DoodstreamResponse> {
  let browser: Browser | undefined;
  
  try {
    const urlObj = new URL(url);
    const baseURL = `${urlObj.protocol}//${urlObj.host}`;

    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page: Page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(3000);

    const firstVideoPageUrl = await page.evaluate((base: string): string | null => {
      const a = document.querySelector('a.video-wrapper') as HTMLAnchorElement;
      if (a) {
        let href = a.getAttribute('href');
        if (href && href.startsWith('/d/')) {
          return base + href;
        }
      }
      return null;
    }, baseURL);

    if (!firstVideoPageUrl) {
      await browser.close();
      return { success: false, error: "Gagal menemukan link video pertama." };
    }

    const videoPage: Page = await browser.newPage();
    await videoPage.goto(firstVideoPageUrl, { 
      waitUntil: 'networkidle2', 
      timeout: 60000 
    });
    await videoPage.waitForTimeout(5000);

    const frames: Frame[] = videoPage.frames();
    let videoUrl: string | null = null;

    for (const frame of frames) {
      try {
        await frame.waitForSelector('video', { timeout: 10000 });
        videoUrl = await frame.evaluate((): string | null => {
          const video = document.querySelector('video') as HTMLVideoElement;
          if (video && video.src) {
            return video.src;
          }

          const source = video?.querySelector('source') as HTMLSourceElement;
          if (source && source.src) {
            return source.src;
          }

          return null;
        });
        if (videoUrl) break;
      } catch (e) {
        continue;
      }
    }

    await browser.close();

    if (!videoUrl) {
      return { 
        success: false, 
        error: "Gagal menemukan video setelah cek semua frames + source." 
      };
    }

    return {
      success: true,
      download_url: videoUrl,
      title: "Doodstream Single Video"
    };
  } catch (err) {
    if (browser) await browser.close();
    const error = err as Error;
    return {
      success: false,
      error: "Doodstream scrape failed",
      detail: error.message
    };
  }
}
