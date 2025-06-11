import { Check, Zap, Building, Rocket } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Navigation } from './Navigation'

export function Pricing() {
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small projects and testing',
      price: 'Free',
      period: '',
      icon: Zap,
      popular: false,
      features: [
        '1,000 requests per month',
        'All output formats',
        'Basic support',
        'API documentation',
        'Community Discord access'
      ],
      limitations: [
        'No priority support',
        'Standard rate limits'
      ]
    },
    {
      name: 'Pro',
      description: 'For growing businesses and applications',
      price: '$29',
      period: '/month',
      icon: Rocket,
      popular: true,
      features: [
        '50,000 requests per month',
        'All output formats',
        'Priority support',
        'Advanced options',
        'Analytics dashboard',
        'Higher rate limits',
        'Custom user agents',
        'Webhook support'
      ],
      limitations: []
    },
    {
      name: 'Enterprise',
      description: 'For large-scale applications',
      price: 'Custom',
      period: '',
      icon: Building,
      popular: false,
      features: [
        'Unlimited requests',
        'All output formats',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantees',
        'On-premise deployment',
        'Custom rate limits',
        'Advanced security',
        'Priority processing'
      ],
      limitations: []
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <Card 
                  key={index} 
                  className={`relative ${plan.popular ? 'border-primary-500 shadow-lg scale-105' : 'border-border'} bg-card/50 backdrop-blur`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary-500 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <Icon className="h-12 w-12 text-primary-500" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-primary-500 hover:bg-primary-600 text-white' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                    </Button>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* FAQ Section */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">How does pricing work?</h3>
                    <p className="text-muted-foreground text-sm">
                      We charge based on the number of API requests you make each month. Each scraping request counts as one API call, regardless of the output formats you choose.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">What happens if I exceed my plan?</h3>
                    <p className="text-muted-foreground text-sm">
                      Your requests will be temporarily throttled until the next billing cycle. You can upgrade anytime to increase your limits immediately.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                    <p className="text-muted-foreground text-sm">
                      Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                    <p className="text-muted-foreground text-sm">
                      We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                    <p className="text-muted-foreground text-sm">
                      Our Starter plan is free forever with 1,000 requests per month. It's perfect for testing our API and small projects.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">What about enterprise needs?</h3>
                    <p className="text-muted-foreground text-sm">
                      For high-volume usage, custom integrations, or on-premise deployments, contact our sales team for a custom solution.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers using Clearfeed to power their applications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}