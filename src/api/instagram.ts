import puppeteer, { Browser, Page } from "puppeteer";
import { InstagramResponse } from "../types/api.js";

export async function getInstagramVideo(url: string): Promise<InstagramResponse> {
  let browser: Browser | undefined;
  
  try {
    browser = await puppeteer.launch({
      headless: "new", 
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page: Page = await browser.newPage();
    await page.goto("https://fastdl.app/", { waitUntil: "networkidle2" });

    await page.waitForSelector("#search-form-input");
    await page.type("#search-form-input", url);

    await page.click(".search-form__button");

    await page.waitForTimeout(3000);
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    await page.waitForSelector(".button__download", { timeout: 30000 });

    const videoLink = await page.evaluate((): string | null => {
      const downloadBtn = document.querySelector(".button__download") as HTMLAnchorElement;
      return downloadBtn ? downloadBtn.href : null;
    });

    await browser.close();

    if (!videoLink) {
      return { success: false, error: "Gagal menemukan link download." };
    }

    return { success: true, video_url: videoLink };
  } catch (err) {
    if (browser) await browser.close();
    const error = err as Error;
    return { 
      success: false, 
      error: "Instagram scrape failed", 
      detail: error.message 
    };
  }
}
