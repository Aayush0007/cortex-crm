"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Brain, Database, Headphones, MessageSquare, Rocket, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection />

      {/* About Us Section */}
      <AboutSection />

      {/* Why CortexCRM Section */}
      <WhySection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative bg-blue-900 text-white py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#FBBF24_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to CortexCRM</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Revolutionize your business with AI-powered customer management
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Button asChild size="lg" className="bg-amber-400 text-blue-900 hover:bg-amber-500 font-semibold">
              <a href="#features">
                Explore Features <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}

function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">About Us</h2>
          <p className="text-lg text-gray-700 mb-8">
            CortexCRM is a cutting-edge customer relationship management platform powered by artificial intelligence. We
            combine the latest in AI technology with intuitive design to help businesses of all sizes manage customer
            relationships more effectively, automate routine tasks, and gain valuable insights from their data.
          </p>
          <p className="text-lg text-gray-700">
            Founded by a team of AI experts and business professionals, CortexCRM is on a mission to make
            enterprise-grade CRM technology accessible to everyone, from startups to Fortune 500 companies.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function WhySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const cards = [
    {
      title: "Automation",
      description: "Automate repetitive tasks and workflows to save time and reduce errors.",
      icon: <Zap className="h-10 w-10 text-amber-400" />,
    },
    {
      title: "AI Insights",
      description: "Leverage machine learning to uncover patterns and opportunities in your customer data.",
      icon: <Brain className="h-10 w-10 text-amber-400" />,
    },
    {
      title: "Scalability",
      description: "Grow your business without growing your workload with our scalable platform.",
      icon: <Rocket className="h-10 w-10 text-amber-400" />,
    },
  ]

  return (
    <section id="why" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Why CortexCRM</h2>
          <p className="text-lg text-gray-700">
            Discover how our AI-powered platform can transform your customer relationships and business operations.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="mb-4">{card.icon}</div>
                  <CardTitle className="text-xl text-blue-900">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">{card.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const features = [
    {
      title: "Lead Management",
      description:
        "Track and nurture leads through your sales pipeline with automated follow-ups and personalized communication.",
      icon: <Database className="h-12 w-12 text-blue-900" />,
    },
    {
      title: "Ticket Support",
      description:
        "Efficiently manage customer support tickets with AI-powered categorization, prioritization, and resolution suggestions.",
      icon: <Headphones className="h-12 w-12 text-blue-900" />,
    },
    {
      title: "AI Assistant",
      description:
        "Get real-time recommendations, draft responses, and analyze customer sentiment with our integrated AI assistant.",
      icon: <MessageSquare className="h-12 w-12 text-blue-900" />,
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Key Features</h2>
          <p className="text-lg text-gray-700">
            Explore the powerful features that make CortexCRM the ultimate solution for modern businesses.
          </p>
        </div>

        <div ref={ref} className="space-y-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-16`}
            >
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center w-full max-w-md aspect-square">
                  {feature.icon}
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">{feature.title}</h3>
                <p className="text-lg text-gray-700">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const testimonials = [
    {
      quote:
        "CortexCRM has transformed how we manage our customer relationships. The AI insights have helped us identify opportunities we would have otherwise missed.",
      author: "Sarah Johnson",
      position: "VP of Sales, TechCorp",
    },
    {
      quote:
        "The automation features in CortexCRM have saved our team countless hours on routine tasks, allowing us to focus on what really matters - our customers.",
      author: "Michael Chen",
      position: "Customer Success Manager, GrowthX",
    },
    {
      quote:
        "As a small business owner, I never thought I could afford enterprise-level CRM capabilities. CortexCRM has made that possible with their scalable platform.",
      author: "Emma Rodriguez",
      position: "Founder, Bright Ideas Consulting",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Customers Say</h2>
          <p className="text-lg text-gray-200">
            Don't just take our word for it. Hear from businesses that have transformed their operations with CortexCRM.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-blue-800 rounded-lg p-6 shadow-lg"
            >
              <div className="mb-4 text-amber-400">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-200 mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-gray-300 text-sm">{testimonial.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ComparisonSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const features = [
    "AI-Powered Insights",
    "Automated Workflows",
    "Lead Scoring",
    "Email Integration",
    "Custom Reporting",
    "Mobile App",
    "API Access",
    "24/7 Support",
  ]

  const competitors = [
    { name: "CortexCRM", values: [true, true, true, true, true, true, true, true] },
    { name: "Competitor A", values: [false, true, true, true, false, true, false, false] },
    { name: "Competitor B", values: [true, false, true, false, true, false, true, false] },
  ]

  return (
    <section id="comparison" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">How We Compare</h2>
          <p className="text-lg text-gray-700">
            See how CortexCRM stacks up against the competition with our feature comparison.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 bg-blue-900 text-white rounded-tl-lg">Features</th>
                {competitors.map((competitor, index) => (
                  <th
                    key={competitor.name}
                    className={`p-4 text-center bg-blue-900 text-white ${
                      index === competitors.length - 1 ? "rounded-tr-lg" : ""
                    }`}
                  >
                    {competitor.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, featureIndex) => (
                <tr key={feature} className={featureIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td className="p-4 border-t border-gray-200 font-medium">{feature}</td>
                  {competitors.map((competitor, competitorIndex) => (
                    <td key={`${feature}-${competitor.name}`} className="p-4 text-center border-t border-gray-200">
                      {competitor.values[featureIndex] ? (
                        <span className="text-green-500 text-xl">✓</span>
                      ) : (
                        <span className="text-red-500 text-xl">✗</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}

function ReviewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const reviews = [
    {
      rating: 5,
      text: "CortexCRM has completely transformed our sales process. The AI recommendations are spot-on and have helped us close deals faster.",
      author: "David Wilson",
      company: "Innovate Solutions",
    },
    {
      rating: 5,
      text: "The customer support team at CortexCRM is exceptional. They're responsive, knowledgeable, and always go the extra mile.",
      author: "Lisa Thompson",
      company: "Global Retail Inc.",
    },
    {
      rating: 4,
      text: "Great platform with powerful features. The learning curve is a bit steep, but once you get the hang of it, it's incredibly powerful.",
      author: "Robert Chang",
      company: "Tech Ventures",
    },
    {
      rating: 5,
      text: "We've tried several CRM solutions, and CortexCRM is by far the most intuitive and feature-rich. The AI assistant is a game-changer.",
      author: "Jennifer Adams",
      company: "Creative Marketing Agency",
    },
  ]

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Customer Reviews</h2>
          <p className="text-lg text-gray-700">
            Read what our customers have to say about their experience with CortexCRM.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${i < review.rating ? "text-amber-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">{review.text}</p>
              <div>
                <p className="font-semibold">{review.author}</p>
                <p className="text-gray-500 text-sm">{review.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CortexCRM</h3>
            <p className="text-gray-300">Revolutionize your business with AI-powered customer management.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} CortexCRM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
