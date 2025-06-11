import { useState } from 'react'
import { Play, Copy, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'

import { Checkbox } from './ui/checkbox'
import { Badge } from './ui/badge'
import toast from 'react-hot-toast'

interface ApiTesterProps {
  apiKey: string | null
}

export function ApiTester({ apiKey }: ApiTesterProps) {
  const [url, setUrl] = useState('https://example.com')
  const [formats, setFormats] = useState({
    html: true,
    markdown: true,
    screenshot: false,
    extract: false,
    meta: false,
    'screenshot@fullPage': false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<object | null>(null)
  const [error, setError] = useState<string | null>(null)

  const formatOptions = [
    { key: 'html', label: 'HTML', description: 'Clean structured HTML' },
    { key: 'markdown', label: 'Markdown', description: 'Readable markdown format' },
    { key: 'extract', label: 'Extract', description: 'Key data extraction' },
    { key: 'meta', label: 'Meta', description: 'Page metadata' },
    { key: 'screenshot', label: 'Screenshot', description: 'Viewport screenshot' },
    { key: 'screenshot@fullPage', label: 'Full Screenshot', description: 'Full-page screenshot' },
  ]

  const handleFormatChange = (format: string, checked: boolean) => {
    setFormats(prev => ({ ...prev, [format]: checked }))
  }

  const runTest = async () => {
    if (!apiKey) {
      toast.error('Please generate an API key first')
      return
    }

    if (!url) {
      toast.error('Please enter a URL')
      return
    }

    const selectedFormats = Object.entries(formats)
      .filter(([, selected]) => selected)
      .map(([format]) => format)

    if (selectedFormats.length === 0) {
      toast.error('Please select at least one format')
      return
    }

    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResponse = {
        url: url,
        timestamp: new Date().toISOString(),
        formats: selectedFormats,
        data: {
          ...(selectedFormats.includes('html') && {
            html: '<html><head><title>Example</title></head><body><h1>Hello World</h1></body></html>'
          }),
          ...(selectedFormats.includes('markdown') && {
            markdown: '# Hello World\n\nThis is example content from the scraped page.'
          }),
          ...(selectedFormats.includes('extract') && {
            extract: {
              title: 'Example Domain',
              description: 'This domain is for use in illustrative examples.',
              links: ['https://example.com/about', 'https://example.com/contact']
            }
          }),
          ...(selectedFormats.includes('meta') && {
            meta: {
              title: 'Example Domain',
              description: 'This domain is for use in illustrative examples.',
              og_title: 'Example Domain',
              viewport: 'width=device-width, initial-scale=1'
            }
          }),
          ...(selectedFormats.includes('screenshot') && {
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
          }),
          ...(selectedFormats.includes('screenshot@fullPage') && {
            'screenshot@fullPage': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
          })
        },
        usage: {
          requests_remaining: 8752,
          rate_limit_reset: new Date(Date.now() + 3600000).toISOString()
        }
      }

      setResponse(mockResponse)
      toast.success('API test completed successfully!')
    } catch {
      setError('Failed to test API. Please check your connection and try again.')
      toast.error('API test failed')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const generateCurlCommand = () => {
    const selectedFormats = Object.entries(formats)
      .filter(([, selected]) => selected)
      .map(([format]) => format)

    return `curl -X POST "https://api.clearfeed.dev/v1/scrape" \\
  -H "Authorization: Bearer ${apiKey || 'YOUR_API_KEY'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "${url}",
    "formats": ${JSON.stringify(selectedFormats, null, 4).replace(/\n/g, '\n    ')}
  }'`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            API Testing Console
          </CardTitle>
          <CardDescription>
            Test the CleanScrape API with different URLs and format combinations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!apiKey && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-600">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">No API Key</span>
              </div>
              <p className="text-sm text-yellow-600/80 mt-1">
                Generate an API key in the "API Keys" tab to test the API
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="testUrl">URL to scrape</Label>
              <Input
                id="testUrl"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Output Formats</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {formatOptions.map((format) => (
                  <div key={format.key} className="flex items-start space-x-3 p-3 rounded-lg border border-border bg-card/50">
                    <Checkbox
                      id={format.key}
                      checked={formats[format.key as keyof typeof formats]}
                      onCheckedChange={(checked) => handleFormatChange(format.key, checked as boolean)}
                    />
                    <div className="flex-1 min-w-0">
                      <Label htmlFor={format.key} className="text-sm font-medium cursor-pointer">
                        {format.label}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={runTest} 
              disabled={isLoading || !apiKey}
              className="w-full bg-primary-500 hover:bg-primary-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing API...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Test API
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* cURL Command */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">cURL Command</CardTitle>
          <CardDescription>
            Copy this command to test in your terminal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="bg-secondary/30 rounded-lg p-4 text-sm overflow-x-auto font-mono">
              {generateCurlCommand()}
            </pre>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(generateCurlCommand())}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Response */}
      {(response || error) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {error ? (
                <>
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Error Response
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  API Response
                </>
              )}
            </CardTitle>
            {response && (
              <div className="flex gap-2">
                <Badge variant="secondary">200 OK</Badge>
                <Badge variant="outline">
                  {Object.keys(response.data).length} format{Object.keys(response.data).length !== 1 ? 's' : ''}
                </Badge>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-secondary/30 rounded-lg p-4 text-sm overflow-x-auto font-mono max-h-96 overflow-y-auto">
                {error ? error : JSON.stringify(response, null, 2)}
              </pre>
              {!error && (
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}