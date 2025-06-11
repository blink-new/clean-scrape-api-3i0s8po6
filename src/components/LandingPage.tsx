import { Link } from 'react-router-dom'
import { ArrowRight, Code, Zap, Shield, Globe, Image, FileText, Play, Check, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Navigation } from './Navigation'

export function LandingPage() {
  const formats = [
    { icon: FileText, name: 'HTML', desc: 'Clean structured HTML with proper formatting and metadata' },
    { icon: Globe, name: 'Extract', desc: 'Intelligent data extraction with AI-powered content parsing' },
    { icon: Code, name: 'Markdown', desc: 'Readable markdown perfect for content processing pipelines' },
    { icon: Image, name: 'Screenshot', desc: 'Crystal-clear full-page captures with custom viewports' },
  ]

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-second response times with global edge deployment and intelligent caching infrastructure'
    },
    {
      icon: Shield,
      title: 'Enterprise Ready',
      description: 'Bank-grade security with 99.99% uptime SLA and automatic failover protection'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Smart content extraction using machine learning to understand page structure and context'
    }
  ]

  const benefits = [
    'Unlimited requests on starter plan',
    'Real-time data extraction',
    'Global CDN with edge computing',
    'Enterprise-grade security',
    'Full JavaScript execution',
    'Mobile & desktop viewports',
    'Custom headers & cookies',
    'Webhook notifications'
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Aurora Background */}
      <div className="aurora-bg"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 mesh-gradient">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <Badge variant="secondary" className="bg-white/5 text-white border-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-3 h-3 mr-2 text-purple-400" />
                Now with AI-powered extraction
              </Badge>
            </div>
            
            {/* Main heading */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
                Web data extraction
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  reimagined
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                Transform any website into clean, structured data with our intelligent API. 
                Multiple output formats, AI-powered extraction, and enterprise reliability at scale.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold h-auto rounded-xl transition-all duration-200 hover:scale-105 shadow-2xl hover:shadow-blue-500/25">
                    Start building free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/docs">
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 px-8 py-4 text-lg font-semibold h-auto rounded-xl transition-all duration-200 backdrop-blur-sm">
                    <Play className="mr-2 h-5 w-5" />
                    Live demo
                  </Button>
                </Link>
              </div>
            </div>

            {/* Code Preview */}
            <div className="max-w-4xl mx-auto animate-float">
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1 shadow-2xl">
                <div className="bg-black/60 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-4 font-mono">api.clearfeed.dev</span>
                  </div>
                  <div className="font-mono text-sm text-left overflow-x-auto">
                    <div className="text-gray-500 mb-3"># Extract data from any website</div>
                    <div className="text-blue-400">curl</div>{" "}
                    <span className="text-blue-300">-X POST</span>{" "}
                    <span className="text-green-400">"https://api.clearfeed.dev/v1/extract"</span>{" "}
                    <span className="text-purple-400">\\</span><br />
                    <span className="text-blue-400 ml-4">-H</span>{" "}
                    <span className="text-green-400">"Authorization: Bearer YOUR_API_KEY"</span>{" "}
                    <span className="text-purple-400">\\</span><br />
                    <span className="text-blue-400 ml-4">-H</span>{" "}
                    <span className="text-green-400">"Content-Type: application/json"</span>{" "}
                    <span className="text-purple-400">\\</span><br />
                    <span className="text-blue-400 ml-4">-d</span>{" "}
                    <span className="text-yellow-400">'{`{`}</span><br />
                    <span className="text-yellow-400 ml-8">"url": "https://example.com",</span><br />
                    <span className="text-yellow-400 ml-8">"formats": ["html", "markdown", "screenshot"],</span><br />
                    <span className="text-yellow-400 ml-8">"ai_extract": true</span><br />
                    <span className="text-yellow-400 ml-4">{`}`}'</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Multiple output formats
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                Choose from multiple data formats designed for modern applications and workflows
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
              {formats.map((format, index) => {
                const Icon = format.icon
                return (
                  <Card key={index} className="group bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm hover:transform hover:scale-105">
                    <CardContent className="p-8 text-center">
                      <div className="relative mb-6">
                        <Icon className="h-12 w-12 mx-auto text-blue-400 group-hover:text-purple-400 transition-colors duration-300" />
                        <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full group-hover:bg-purple-400/20 transition-colors duration-300"></div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white">{format.name}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{format.desc}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="text-center group">
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-blue-400 group-hover:text-purple-400 transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 mesh-gradient">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Built for modern teams
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                Everything you need to extract, process, and integrate web data at any scale
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-900/40 to-gray-800/40 border border-white/5 backdrop-blur-sm hover:border-white/10 transition-all duration-200">
                  <div className="bg-green-500/20 p-1 rounded-full">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-gray-300 text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready to transform
              <br />
              <span className="text-gradient-blue">your data workflow?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 font-light">
              Join thousands of developers already building with Clearfeed. 
              Start for free, no credit card required.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-6 text-xl font-semibold h-auto rounded-xl transition-all duration-200 hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
                Start building for free
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-gray-950/80 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-8 md:mb-0">
                <div className="relative">
                  <Zap className="h-8 w-8 text-blue-400" />
                  <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Clearfeed
                </span>
              </div>
              <div className="flex space-x-8 text-gray-400">
                <Link to="/docs" className="hover:text-white transition-colors font-medium">Documentation</Link>
                <Link to="/pricing" className="hover:text-white transition-colors font-medium">Pricing</Link>
                <a href="#" className="hover:text-white transition-colors font-medium">Support</a>
                <a href="#" className="hover:text-white transition-colors font-medium">Status</a>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500">
              © 2024 Clearfeed. Empowering developers with intelligent data extraction.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}