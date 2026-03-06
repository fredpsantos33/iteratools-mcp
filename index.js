#!/usr/bin/env node
/**
 * IteraTools MCP Server
 * 40+ pay-per-use API tools for AI agents
 * https://iteratools.com
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');

const BASE_URL = 'https://api.iteratools.com';
const API_KEY = process.env.ITERATOOLS_API_KEY || '';

const TOOLS = [
  // Images
  { name: 'image_generate', description: 'Generate an image using Flux 1.1 Pro AI model', inputSchema: { type: 'object', properties: { prompt: { type: 'string', description: 'Image description' }, width: { type: 'number', default: 1024 }, height: { type: 'number', default: 1024 } }, required: ['prompt'] }, endpoint: '/image/generate', price: '$0.005' },
  { name: 'image_fast', description: 'Generate an image quickly using Flux Schnell (faster, cheaper)', inputSchema: { type: 'object', properties: { prompt: { type: 'string' }, width: { type: 'number', default: 1024 }, height: { type: 'number', default: 1024 } }, required: ['prompt'] }, endpoint: '/image/fast', price: '$0.002' },
  { name: 'image_rembg', description: 'Remove background from an image', inputSchema: { type: 'object', properties: { url: { type: 'string', description: 'Image URL' } }, required: ['url'] }, endpoint: '/image/rembg', price: '$0.003' },
  { name: 'image_resize', description: 'Resize an image to specified dimensions', inputSchema: { type: 'object', properties: { url: { type: 'string' }, width: { type: 'number' }, height: { type: 'number' } }, required: ['url', 'width', 'height'] }, endpoint: '/image/resize', price: '$0.001' },
  { name: 'image_ocr', description: 'Extract text from an image using OCR', inputSchema: { type: 'object', properties: { url: { type: 'string', description: 'Image URL' } }, required: ['url'] }, endpoint: '/image/ocr', price: '$0.002' },
  // Video
  { name: 'video_generate', description: 'Generate a short video from a prompt using Kling AI', inputSchema: { type: 'object', properties: { prompt: { type: 'string' }, duration: { type: 'number', default: 5 } }, required: ['prompt'] }, endpoint: '/video/generate', price: '$0.05' },
  // Audio
  { name: 'tts', description: 'Convert text to speech (MP3)', inputSchema: { type: 'object', properties: { text: { type: 'string' }, voice: { type: 'string', default: 'alloy' } }, required: ['text'] }, endpoint: '/tts', price: '$0.002' },
  { name: 'audio_transcribe', description: 'Transcribe audio from a URL using Whisper AI', inputSchema: { type: 'object', properties: { url: { type: 'string', description: 'URL of audio file (mp3/mp4/wav/ogg/webm)' }, language: { type: 'string', description: 'Language code (e.g. en, pt)', default: 'en' } }, required: ['url'] }, endpoint: '/audio/transcribe', price: '$0.003/min' },
  // Web
  { name: 'scrape', description: 'Scrape and extract text content from a URL', inputSchema: { type: 'object', properties: { url: { type: 'string' } }, required: ['url'] }, endpoint: '/scrape', price: '$0.001' },
  { name: 'screenshot', description: 'Take a screenshot of a webpage', inputSchema: { type: 'object', properties: { url: { type: 'string' } }, required: ['url'] }, endpoint: '/screenshot', price: '$0.003' },
  { name: 'search', description: 'Search the web and return results', inputSchema: { type: 'object', properties: { query: { type: 'string' }, count: { type: 'number', default: 5 } }, required: ['query'] }, endpoint: '/search', price: '$0.002' },
  { name: 'browser_act', description: 'Automate browser actions (click, fill, extract, navigate)', inputSchema: { type: 'object', properties: { actions: { type: 'array', description: 'List of actions: {type, url/selector/text/script}', items: { type: 'object' } } }, required: ['actions'] }, endpoint: '/browser/act', price: '$0.005' },
  // PDF
  { name: 'pdf_extract', description: 'Extract text from a PDF file', inputSchema: { type: 'object', properties: { url: { type: 'string', description: 'PDF URL' } }, required: ['url'] }, endpoint: '/pdf/extract', price: '$0.003' },
  { name: 'pdf_generate', description: 'Generate a PDF from HTML content', inputSchema: { type: 'object', properties: { html: { type: 'string' } }, required: ['html'] }, endpoint: '/pdf/generate', price: '$0.003' },
  // Utils
  { name: 'qrcode', description: 'Generate a QR code image', inputSchema: { type: 'object', properties: { text: { type: 'string', description: 'Text or URL to encode' }, size: { type: 'number', default: 300 } }, required: ['text'] }, endpoint: '/qrcode', price: '$0.001' },
  { name: 'url_shorten', description: 'Shorten a URL', inputSchema: { type: 'object', properties: { url: { type: 'string' } }, required: ['url'] }, endpoint: '/url/shorten', price: '$0.001' },
  { name: 'email_validate', description: 'Validate an email address (format + MX check)', inputSchema: { type: 'object', properties: { email: { type: 'string' } }, required: ['email'] }, endpoint: '/email/validate', price: '$0.001' },
  { name: 'weather', description: 'Get current weather and forecast for a location', inputSchema: { type: 'object', properties: { location: { type: 'string', description: 'City name or coordinates' } }, required: ['location'] }, endpoint: '/weather', price: '$0.001' },
  { name: 'crypto_price', description: 'Get current cryptocurrency price', inputSchema: { type: 'object', properties: { coin: { type: 'string', default: 'bitcoin', description: 'Coin name (e.g. bitcoin, ethereum)' } }, required: [] }, endpoint: '/crypto/price', price: '$0.001' },
  { name: 'translate', description: 'Translate text to another language', inputSchema: { type: 'object', properties: { text: { type: 'string' }, target_lang: { type: 'string', description: 'Target language code (e.g. pt, es, fr)' }, source_lang: { type: 'string', default: 'auto' } }, required: ['text', 'target_lang'] }, endpoint: '/translate', price: '$0.001' },
  { name: 'dns_lookup', description: 'Lookup DNS records for a domain', inputSchema: { type: 'object', properties: { domain: { type: 'string' }, types: { type: 'array', items: { type: 'string' }, default: ['A', 'MX', 'TXT'] } }, required: ['domain'] }, endpoint: '/dns/lookup', price: '$0.001' },
  { name: 'spreadsheet_generate', description: 'Generate an Excel or CSV spreadsheet', inputSchema: { type: 'object', properties: { format: { type: 'string', enum: ['xlsx', 'csv'], default: 'xlsx' }, filename: { type: 'string', default: 'report' }, sheets: { type: 'array', description: 'Array of {name, headers, rows}', items: { type: 'object' } } }, required: ['sheets'] }, endpoint: '/spreadsheet/generate', price: '$0.003' },
  { name: 'chart_generate', description: 'Generate a chart image (bar, line, pie, etc.)', inputSchema: { type: 'object', properties: { type: { type: 'string', enum: ['bar', 'line', 'pie', 'doughnut', 'radar'] }, labels: { type: 'array', items: { type: 'string' } }, datasets: { type: 'array', items: { type: 'object' } }, title: { type: 'string' } }, required: ['type', 'labels', 'datasets'] }, endpoint: '/chart/generate', price: '$0.002' },
  { name: 'code_execute', description: 'Execute Python or JavaScript code in a sandbox', inputSchema: { type: 'object', properties: { code: { type: 'string' }, language: { type: 'string', enum: ['python', 'javascript'], default: 'python' } }, required: ['code'] }, endpoint: '/code/execute', price: '$0.01' },
  // WhatsApp
  { name: 'whatsapp_send', description: 'Send a WhatsApp message using a pre-approved template', inputSchema: { type: 'object', properties: { to: { type: 'string', description: 'Phone number with country code (e.g. +15551234567)' }, template: { type: 'string' }, language: { type: 'string', default: 'en_US' }, params: { type: 'array', items: { type: 'string' } } }, required: ['to', 'template'] }, endpoint: '/whatsapp/send', price: '$0.005' },
];

async function callTool(endpoint, params) {
  const fetch = (await import('node-fetch')).default;
  const isGet = ['GET'].includes((TOOLS.find(t => t.endpoint === endpoint) || {}).method);
  
  const url = isGet 
    ? `${BASE_URL}${endpoint}?${new URLSearchParams(params)}`
    : `${BASE_URL}${endpoint}`;
  
  const res = await fetch(url, {
    method: isGet ? 'GET' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: isGet ? undefined : JSON.stringify(params),
  });
  
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  
  if (!res.ok) {
    if (res.status === 402) {
      throw new Error(`Insufficient credits. Add credits at https://iteratools.com. Cost: ${TOOLS.find(t=>t.endpoint===endpoint)?.price || 'see docs'}`);
    }
    throw new Error(`API error ${res.status}: ${text.substring(0, 200)}`);
  }
  
  return data;
}

const server = new Server(
  { name: 'iteratools', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS.map(t => ({
    name: t.name,
    description: `${t.description} (${t.price})`,
    inputSchema: t.inputSchema,
  })),
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (!API_KEY) {
    return {
      content: [{ type: 'text', text: 'Error: ITERATOOLS_API_KEY environment variable not set. Get a key at https://iteratools.com' }],
      isError: true,
    };
  }
  
  const tool = TOOLS.find(t => t.name === name);
  if (!tool) {
    return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
  
  try {
    const result = await callTool(tool.endpoint, args);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    return { content: [{ type: 'text', text: `Error: ${err.message}` }], isError: true };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('IteraTools MCP server running. Set ITERATOOLS_API_KEY env var.');
}

main().catch(console.error);
