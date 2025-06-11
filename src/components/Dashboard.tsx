import { useState } from 'react'
import { Copy, RefreshCw, Eye, EyeOff, Key, Activity, Code, Zap } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Navigation } from './Navigation'
import { ApiTester } from './ApiTester'
import toast from 'react-hot-toast'

interface DashboardProps {
  apiKey: string | null
  setApiKey: (key: string) => void
}

export function Dashboard({ apiKey, setApiKey }: DashboardProps) {
  const [showKey, setShowKey] = useState(false)
  const [keyName, setKeyName] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [usage] = useState({
    requests: 1247,
    limit: 10000,
    percentage: 12.47
  })

  const generateApiKey = async () => {
    setIsGenerating(true)
    // Simulate API key generation
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newKey = `cs_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    setApiKey(newKey)
    localStorage.setItem('clearfeed-api-key', newKey)
    setIsGenerating(false)
    toast.success('API key generated successfully!')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your API keys and monitor usage</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="keys">API Keys</TabsTrigger>
              <TabsTrigger value="test">Test API</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{usage.requests.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      {usage.percentage}% of monthly limit
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">99.8%</div>
                    <p className="text-xs text-muted-foreground">
                      Last 30 days
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
                    <Code className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">847ms</div>
                    <p className="text-xs text-muted-foreground">
                      Including full-page renders
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usage This Month</CardTitle>
                  <CardDescription>
                    You've used {usage.requests.toLocaleString()} out of {usage.limit.toLocaleString()} requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-secondary rounded-full h-2 mb-4">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(usage.percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{usage.requests.toLocaleString()} requests</span>
                    <span>{(usage.limit - usage.requests).toLocaleString()} remaining</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="keys" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    API Keys
                  </CardTitle>
                  <CardDescription>
                    Generate and manage your API keys for accessing Clearfeed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!apiKey ? (
                    <div className="text-center py-8">
                      <Key className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No API Keys Yet</h3>
                      <p className="text-muted-foreground mb-6">Generate your first API key to start using CleanScrape</p>
                      
                      <div className="max-w-md mx-auto space-y-4">
                        <div>
                          <Label htmlFor="keyName">Key Name (Optional)</Label>
                          <Input
                            id="keyName"
                            placeholder="e.g., Production API Key"
                            value={keyName}
                            onChange={(e) => setKeyName(e.target.value)}
                          />
                        </div>
                        <Button 
                          onClick={generateApiKey} 
                          disabled={isGenerating}
                          className="w-full bg-primary-500 hover:bg-primary-600"
                        >
                          {isGenerating ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Key className="mr-2 h-4 w-4" />
                              Generate API Key
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Production API Key</h3>
                          <p className="text-sm text-muted-foreground">Created today</p>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="apiKey">API Key</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="apiKey"
                            type={showKey ? "text" : "password"}
                            value={apiKey}
                            readOnly
                            className="font-mono"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowKey(!showKey)}
                          >
                            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(apiKey)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          onClick={generateApiKey}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="mr-2 h-4 w-4" />
                          )}
                          Regenerate Key
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="test">
              <ApiTester apiKey={apiKey} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}