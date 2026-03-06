# IteraTools MCP Server

> Production-ready MCP server with 30+ tools for AI agents — QR codes, PDFs, text processing, TTS, web scraping, image generation, browser automation, code execution and more.

[![npm version](https://img.shields.io/npm/v/iteratools-mcp)](https://www.npmjs.com/package/iteratools-mcp)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-green)](https://iteratools.com)
[![API Docs](https://img.shields.io/badge/docs-iteratools.com-blue)](https://iteratools.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is IteraTools?

IteraTools is a production-ready API platform providing ready-to-use utilities for AI agents and developers. With a single API key, access 30+ tools via the Model Context Protocol (MCP).

Uses **x402 micropayments** on Base — no subscription needed, pay per use in USDC. Or use API key credits.

## Quick Start

### npx (recommended)

```bash
npx iteratools-mcp
```

Set your API key via environment variable:
```bash
ITERATOOLS_API_KEY=your-api-key npx iteratools-mcp
```

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "iteratools": {
      "command": "npx",
      "args": ["iteratools-mcp"],
      "env": {
        "ITERATOOLS_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Claude Code (CLI)

```bash
claude mcp add iteratools -- npx iteratools-mcp
```

Then set your key:
```bash
export ITERATOOLS_API_KEY=your-api-key
```

### Cursor / Windsurf

Add to your MCP settings:

```json
{
  "mcpServers": {
    "iteratools": {
      "command": "npx",
      "args": ["iteratools-mcp"],
      "env": {
        "ITERATOOLS_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Smithery (remote, no install)

```json
{
  "mcpServers": {
    "iteratools": {
      "type": "http",
      "url": "https://iteratools--iterasoft.run.tools/mcp",
      "headers": {
        "Authorization": "Bearer your-api-key"
      }
    }
  }
}
```

## Get an API Key

1. Visit [iteratools.com](https://iteratools.com)
2. Click **Get Started** — free trial included
3. Copy your API key

## Available Tools (30+)

| Category | Tools |
|----------|-------|
| 🖼️ Images | `image_generate` (Flux 1.1 Pro), `image_fast`, `image_rembg` (background removal), `image_resize`, `image_ocr` |
| 🎬 Video | `video_generate` (Kling), `video_frames` |
| 📄 PDF | `pdf_extract`, `pdf_generate` |
| 🌐 Web | `scrape`, `screenshot`, `search`, `browser_act` (Playwright) |
| 🔊 Audio | `tts` (text-to-speech), `transcribe` |
| 📱 WhatsApp | `whatsapp_send`, `whatsapp_reply` |
| 🌍 Data | `weather`, `crypto_price`, `ip_geolocation`, `currency_convert`, `dns_lookup` |
| 🔧 Utils | `qrcode`, `url_shorten`, `email_validate`, `translate`, `chart_generate`, `spreadsheet_generate`, `code_execute` |

## Example Usage

```bash
# Generate a QR code
curl -X POST https://api.iteratools.com/qrcode \
  -H "Authorization: Bearer your-key" \
  -d '{"text": "https://iteratools.com"}'

# Generate an image with Flux
curl -X POST https://api.iteratools.com/image/generate \
  -H "Authorization: Bearer your-key" \
  -d '{"prompt": "a sunset over mountains, photorealistic"}'

# Scrape a webpage
curl -X POST https://api.iteratools.com/scrape \
  -H "Authorization: Bearer your-key" \
  -d '{"url": "https://example.com"}'

# Text to speech
curl -X POST https://api.iteratools.com/tts \
  -H "Authorization: Bearer your-key" \
  -d '{"text": "Hello world", "voice": "en-US-JennyNeural"}'
```

## Pricing

Pay per use — no subscription:

| Tool | Price |
|------|-------|
| Image generate (Flux 1.1 Pro) | $0.005 |
| Image fast | $0.002 |
| Video generate | $0.05 |
| Browser automation | $0.005 |
| Code execution | $0.003 |
| PDF/Web/Utils tools | $0.001–0.003 |

Full pricing: [iteratools.com/#pricing](https://iteratools.com/#pricing)

## Status

**🟢 All Systems Operational** — [iteratools.com/status](https://iteratools.com/status.html)

## Links

- 🌐 [Website](https://iteratools.com)
- 📦 [npm](https://www.npmjs.com/package/iteratools-mcp)
- 🔌 [API Reference](https://iteratools.com/docs)
- 📊 [Status Page](https://iteratools.com/status.html)
- 🐙 [GitHub](https://github.com/fredpsantos33/iteratools-mcp)
