# Social Media Downloader Bot

A comprehensive social media video downloader bot built with TypeScript, supporting multiple platforms including TikTok, Facebook, Instagram, Twitter/X, and Doodstream (coming soon).

## 🌟 Features

- **Multi-platform Support**: Download videos from TikTok, Facebook, Instagram, Twitter/X
- **Telegram Bot Integration**: Easy-to-use Telegram bot interface
- **REST API**: HTTP API endpoints for programmatic access
- **Admin Panel**: Broadcast messages to all users (admin only)
- **Auto Group Detection**: Automatically detects and downloads videos posted in groups
- **Quality Selection**: Multiple quality options for Twitter videos
- **User Management**: Automatic user registration and tracking

## 🚀 Supported Platforms

- ✅ **TikTok**: Download videos without watermark
- ✅ **Facebook**: Download reels & videos
- ✅ **Instagram**: Download reels, stories, and feed videos
- ✅ **Twitter/X**: Download videos with quality options
- 🚧 **Doodstream**: Coming soon

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Telegram Bot Token (from [@BotFather](https://t.me/botfather))

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd sosmed-downloader-typescript
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**

Create `.env` file in `src/config/` directory:

```env
BOT_TOKEN=your_telegram_bot_token_here
VPS_API_URL=http://localhost:3000
PORT=3000
ADMINS=123456789,987654321
```

4. **Build the project**

```bash
npm run build
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Run API server only
npm run dev

# Run Telegram bot only  
npm run dev:bot

# Run both API server and bot
npm run dev:all
```

### Production Mode

```bash
# Run API server only
npm run start

# Run Telegram bot only
npm run start:bot

# Run both API server and bot
npm run start:all
```

## 📚 API Documentation

### Base URL

```sh
http://localhost:3000
```

### Endpoints

#### TikTok Video Download

```http
GET /api/tiktok?url=<tiktok_url>
```

#### Facebook Video Download

```http
GET /api/facebook?url=<facebook_url>
```

#### Instagram Video Download

```http
GET /api/instagram?url=<instagram_url>
```

#### Twitter Video Download

```http
GET /api/twitter?url=<twitter_url>
```

#### Doodstream Video Download (Coming Soon)

```http
GET /api/doodstream?url=<doodstream_url>
```

### Response Format

```json
{
  "success": true,
  "video_url": "https://example.com/video.mp4",
  "title": "Video Title",
  "quality": "HD",
  "available_qualities": [
    {
      "quality": "HD",
      "url": "https://example.com/hd.mp4"
    }
  ]
}
```

## 🤖 Telegram Bot Usage

1. **Start the bot**: Send `/start` to your bot
2. **Choose platform**: Select the social media platform
3. **Send link**: Send the video URL you want to download
4. **Get video**: Receive the downloaded video

### Admin Features

- **Broadcast**: Send messages to all registered users
- **User Management**: View and manage active users

## 📁 Project Structure

```ini
src/
├── api/                 # API handlers for each platform
│   ├── doodstream.ts    # Doodstream video scraper
│   ├── facebook.ts      # Facebook video scraper
│   ├── instagram.ts     # Instagram video scraper
│   ├── tiktok.ts        # TikTok API integration
│   └── twitter.ts       # Twitter video scraper
├── bot/                 # Telegram bot implementation
│   └── bot.ts           # Main bot logic
├── config/              # Configuration files
│   ├── .env             # Environment variables
│   ├── env.ts           # Environment configuration
│   └── users.json       # Active users storage
├── types/               # TypeScript type definitions
│   ├── api.ts           # API response types
│   └── bot.ts           # Bot-related types
└── index.ts             # Main API server
```

## 🔧 Technologies Used

- **TypeScript**: Type-safe JavaScript development
- **Express.js**: Web framework for API server
- **Telegraf**: Telegram Bot API framework
- **Puppeteer**: Web scraping for video extraction
- **Axios**: HTTP client for API requests
- **dotenv**: Environment variable management

## 🛡️ Security Features

- Environment variable validation
- Admin-only broadcast functionality
- User registration tracking
- Error handling and logging

## 📝 Scripts

- `npm run build`: Compile TypeScript to JavaScript
- `npm run dev`: Run API server in development mode
- `npm run dev:bot`: Run Telegram bot in development mode
- `npm run dev:all`: Run both API and bot in development mode
- `npm run start`: Run compiled API server
- `npm run start:bot`: Run compiled Telegram bot
- `npm run start:all`: Run both compiled API and bot
- `npm run clean`: Remove dist directory

## 📄 License

This project is licensed under the MIT License.

## 🐛 Bug Reports

Report bugs via [GitHub Issues](https://github.com/MbotixTech/downloader-bot/issues) or contact [@xiaogarpu](https://t.me/xiaogarpu) on Telegram.

## 💖 Support

If you find this project helpful, consider supporting the developer:

- ☕ [Buy me a coffee](https://saweria.co/MbotixTech)

## ⚠️ Disclaimer

This tool is for educational and personal use only. Please respect the terms of service of the respective social media platforms and ensure you have the right to download the content.

---

Made with ❤️ by MbotixTech