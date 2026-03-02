# IteraTools MCP Server

> Production-ready MCP server with 40+ tools for AI agents — QR codes, PDFs, text processing, TTS, web scraping, image generation and more.

[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-green)](https://iteratools.com)
[![API Docs](https://img.shields.io/badge/docs-iteratools.com-blue)](https://iteratools.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is IteraTools?

IteraTools is a production-ready API platform providing ready-to-use utilities for AI agents and developers. With a single API key, access 40+ tools via the Model Context Protocol (MCP).

Uses **x402 micropayments** on Base — no subscription needed, pay per use in USDC.

## Available Tools

| Category | Tools |
|----------|-------|
| 🖼️ Images | Generate (Flux 1.1 Pro), fast generate, background removal (rembg), resize, OCR |
| 🎬 Video | Generate (Kling), extract frames |
| 📄 PDF | Extract text, generate from HTML |
| 🌐 Web | Scrape, screenshot, search |
| 🔊 Audio | TTS (text-to-speech), transcription |
| 📱 WhatsApp | Send template, reply in conversation |
| 🔧 Utils | QR code, URL shortener, email validate, weather, crypto price, code execution |

## Quick Start

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "iteratools": {
      "command": "npx",
      "args": ["-y", "@iteratools/mcp"],
      "env": {
        "ITERATOOLS_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Get API Key

1. Visit [iteratools.com](https://iteratools.com)
2. Sign up for free
3. Copy your API key

### Example Usage

```bash
# Generate a QR code
curl -X POST https://api.iteratools.com/qrcode \
  -H "X-API-Key: your-key" \
  -d '{"text": "https://iteratools.com"}'

# Generate an image
curl -X POST https://api.iteratools.com/image/generate \
  -H "X-API-Key: your-key" \
  -d '{"prompt": "a sunset over mountains"}'
```

## Pricing

Pay per use — no subscription:

| Tool | Price |
|------|-------|
| Image generate (Flux 1.1 Pro) | $0.005 |
| Image fast | $0.002 |
| Video generate | $0.05 |
| PDF/Web/Utils tools | $0.001–0.003 |

## Links

- 🌐 [Website](https://iteratools.com)
- 📚 [API Documentation](https://iteratools.com/docs)
- 🐙 [GitHub](https://github.com/fredpsantos33/iteratools-mcp)
- 💬 [Support](https://iteratools.com/support)
