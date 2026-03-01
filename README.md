# IteraTools MCP Server

> Production-ready MCP server with 40+ tools — QR codes, PDFs, text processing, TTS, web scraping, image generation and more.

[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-green)](https://iteratools.com)
[![API Docs](https://img.shields.io/badge/docs-iteratools.com-blue)](https://iteratools.com)

<a href="https://glama.ai/mcp/servers/@fredpsantos33/itera-tools-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@fredpsantos33/itera-tools-mcp/badge" alt="IteraTools MCP server" />
</a>

## What is IteraTools?

IteraTools is a Brazilian API platform providing ready-to-use utilities for AI agents and developers. With a single API key, access 40+ tools via the Model Context Protocol (MCP).

## Available Tools

| Category | Tools |
|----------|-------|
| QR & Barcodes | Generate QR codes, barcodes |
| PDF | HTML to PDF, merge, split, watermark |
| Text | Summarize, translate, extract, format |
| Images | Generate, resize, convert, watermark |
| Audio | TTS (text-to-speech), transcription |
| Web | Scrape, screenshot, metadata |
| Utils | UUID, hash, base64, URL shortener |

## MCP Configuration

Add to your `claude_desktop_config.json`:

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

## Get Started

1. Sign up at [iteratools.com](https://iteratools.com)
2. Get your API key
3. Add to your MCP client config above

## Full API Documentation

→ [iteratools.com](https://iteratools.com)