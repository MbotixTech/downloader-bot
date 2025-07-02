import puppeteer, { Browser, Page } from "puppeteer";
import { FacebookResponse } from "../types/api.js";

export async function getFacebookVideo(url: string): Promise<FacebookResponse> {
  let browser: Browser | undefined;
  
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page: Page = await browser.newPage();
    await page.goto("https://snapsave.app/facebook-reels-download", { 
      waitUntil: "networkidle2" 
    });

    await page.waitForSelector("#url");
    await page.type("#url", url);

    await page.click('button[type="submit"]');

    await page.waitForSelector(".button.is-success.is-small", { timeout: 30000 });

    const videoLink = await page.evaluate((): string | null => {
      const link = document.querySelector('.button.is-success.is-small') as HTMLAnchorElement;
      return link ? link.href : null;
    });

    await browser.close();

    if (!videoLink) {
      return { success: false, error: "Tidak ada video link ditemukan." };
    }

    return { 
      success: true, 
      video_url: videoLink, 
      title: "Tanpa Judul" 
    };
  } catch (err) {
    if (browser) await browser.close();
    const error = err as Error;
    return { 
      success: false, 
      error: "SnapSave scrape failed", 
      detail: error.message 
    };
  }
}
