import { useState } from 'react'
import { Copy, ExternalLink, Zap, Shield } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Navigation } from './Navigation'
import toast from 'react-hot-toast'

export function Documentation() {
  const [selectedLanguage, setSelectedLanguage] = useState('curl')

  const codeExamples = {
    curl: `curl -X POST "https://api.clearfeed.dev/v1/scrape" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "formats": ["html", "markdown", "screenshot"]
  }'`,
    
    javascript: `const response = await fetch('https://api.clearfeed.dev/v1/scrape', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    formats: ['html', 'markdown', 'screenshot']
  })
});

const data = await response.json();`,

    python: `import requests

response = requests.post(
    'https://api.cleanscrape.dev/v1/scrape',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
    },
    json={
        'url': 'https://example.com',
        'formats': ['html', 'markdown', 'screenshot']
    }
)

data = response.json()`,

    php: `<?php
$data = json_encode([
    'url' => 'https://example.com',
    'formats' => ['html', 'markdown', 'screenshot']
]);

$ch = curl_init('https://api.cleanscrape.dev/v1/scrape');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const formats = [
    {
      name: 'html',
      description: 'Returns clean, structured HTML content',
      example: '<html><head><title>Page Title</title></head>...'
    },
    {
      name: 'markdown',
      description: 'Converts content to readable Markdown format',
      example: '# Page Title\n\nThis is the main content...'
    },
    {
      name: 'extract',
      description: 'Extracts key data points from the page',
      example: '{"title": "Page Title", "links": [...], "images": [...]}'
    },
    {
      name: 'meta',
      description: 'Returns page metadata and OpenGraph tags',
      example: '{"title": "Page Title", "description": "...", "og_image": "..."}'
    },
    {
      name: 'screenshot',
      description: 'Captures a viewport screenshot of the page',
      example: 'Base64 encoded PNG image data'
    },
    {
      name: 'screenshot@fullPage',
      description: 'Captures a full-page scrolling screenshot',
      example: 'Base64 encoded PNG image data of entire page'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Documentation
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to integrate Clearfeed into your application
            </p>
          </div>

          <Tabs defaultValue="quickstart" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
              <TabsTrigger value="formats">Formats</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="reference">Reference</TabsTrigger>
            </TabsList>

            <TabsContent value="quickstart" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Getting Started
                  </CardTitle>
                  <CardDescription>
                    Start scraping websites in minutes with our simple API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">1. Get your API key</h3>
                      <p className="text-muted-foreground">
                        Sign up and generate your API key from the dashboard. It's free to get started.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">2. Make your first request</h3>
                      <p className="text-muted-foreground mb-3">
                        Send a POST request to our scraping endpoint with your URL and desired formats.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          {Object.keys(codeExamples).map((lang) => (
                            <Button
                              key={lang}
                              variant={selectedLanguage === lang ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedLanguage(lang)}
                              className="capitalize"
                            >
                              {lang}
                            </Button>
                          ))}
                        </div>
                        
                        <div className="relative">
                          <pre className="bg-secondary/30 rounded-lg p-4 text-sm overflow-x-auto font-mono">
                            {codeExamples[selectedLanguage as keyof typeof codeExamples]}
                          </pre>
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(codeExamples[selectedLanguage as keyof typeof codeExamples])}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">3. Handle the response</h3>
                      <p className="text-muted-foreground">
                        Process the returned data according to your chosen formats. All responses include metadata about the scraping process.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Include your API key in the Authorization header using Bearer authentication:
                  </p>
                  <div className="bg-secondary/30 rounded-lg p-4 font-mono text-sm">
                    Authorization: Bearer YOUR_API_KEY
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="formats" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Output Formats</CardTitle>
                  <CardDescription>
                    Choose from 6 different formats to get exactly the data you need
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {formats.map((format, index) => (
                      <div key={index} className="border-l-4 border-primary-500 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="font-mono">
                            {format.name}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{format.description}</p>
                        <div className="bg-secondary/30 rounded-lg p-3 font-mono text-sm">
                          {format.example}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Common Use Cases</CardTitle>
                  <CardDescription>
                    Real-world examples of how to use CleanScrape
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Content Monitoring</h3>
                    <p className="text-muted-foreground mb-3">
                      Monitor website changes by regularly scraping and comparing content
                    </p>
                    <div className="bg-secondary/30 rounded-lg p-4 font-mono text-sm">
                      {`{
  "url": "https://news.example.com/latest",
  "formats": ["extract", "meta"],
  "options": {
    "wait_for": "networkidle"
  }
}`}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">SEO Analysis</h3>
                    <p className="text-muted-foreground mb-3">
                      Extract metadata and structured data for SEO analysis
                    </p>
                    <div className="bg-secondary/30 rounded-lg p-4 font-mono text-sm">
                      {`{
  "url": "https://competitor.com",
  "formats": ["meta", "extract", "html"],
  "options": {
    "extract_schema": true
  }
}`}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Visual Testing</h3>
                    <p className="text-muted-foreground mb-3">
                      Capture screenshots for visual regression testing
                    </p>
                    <div className="bg-secondary/30 rounded-lg p-4 font-mono text-sm">
                      {`{
  "url": "https://app.example.com/dashboard",
  "formats": ["screenshot@fullPage"],
  "options": {
    "viewport": {
      "width": 1920,
      "height": 1080
    }
  }
}`}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reference" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Reference</CardTitle>
                  <CardDescription>
                    Complete API documentation and parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Base URL</h3>
                    <div className="bg-secondary/30 rounded-lg p-3 font-mono text-sm">
                      https://api.cleanscrape.dev/v1
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Endpoints</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">POST</Badge>
                        <code className="text-sm">/scrape</code>
                        <span className="text-muted-foreground">Scrape a website</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">GET</Badge>
                        <code className="text-sm">/usage</code>
                        <span className="text-muted-foreground">Check API usage</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Rate Limits</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Free tier:</span>
                        <span className="text-muted-foreground">1,000 requests/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pro tier:</span>
                        <span className="text-muted-foreground">50,000 requests/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Enterprise:</span>
                        <span className="text-muted-foreground">Custom limits</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Join our Discord community</p>
                      <p className="text-sm text-muted-foreground">Get help from our team and other developers</p>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Discord
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}