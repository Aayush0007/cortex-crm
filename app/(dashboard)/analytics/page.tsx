"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getServerState } from "@/lib/server-state"

// Sample data for demonstration purposes
const leadConversionData = [
  { month: "Jan", conversion: 15 },
  { month: "Feb", conversion: 18 },
  { month: "Mar", conversion: 14 },
  { month: "Apr", conversion: 21 },
  { month: "May", conversion: 25 },
  { month: "Jun", conversion: 28 },
  { month: "Jul", conversion: 24 },
  { month: "Aug", conversion: 30 },
  { month: "Sep", conversion: 35 },
  { month: "Oct", conversion: 32 },
  { month: "Nov", conversion: 38 },
  { month: "Dec", conversion: 45 },
]

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 66000 },
  { month: "Jun", revenue: 78000 },
  { month: "Jul", revenue: 74000 },
  { month: "Aug", revenue: 83000 },
  { month: "Sep", revenue: 95000 },
  { month: "Oct", revenue: 102000 },
  { month: "Nov", revenue: 110000 },
  { month: "Dec", revenue: 128450 },
]

const ticketResolutionData = [
  { agent: "John D.", resolved: 42 },
  { agent: "Emma S.", resolved: 38 },
  { agent: "Michael R.", resolved: 55 },
  { agent: "Sarah T.", resolved: 47 },
  { agent: "David M.", resolved: 36 },
]

export default function AnalyticsPage() {
  const [serverState, setServerState] = useState(getServerState())

  useEffect(() => {
    const interval = setInterval(() => {
      setServerState(getServerState())
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Analytics</h1>
        <p className="text-gray-600">Track key performance metrics and business insights</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Lead Analytics</TabsTrigger>
          <TabsTrigger value="tickets">Ticket Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">Total Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{serverState.leads.toLocaleString()}</div>
                  <p className="text-sm text-green-600">+12.5% from last month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">Open Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{serverState.tickets.toLocaleString()}</div>
                  <p className="text-sm text-green-600">-8.3% from last month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${serverState.revenue.toLocaleString()}</div>
                  <p className="text-sm text-green-600">+23.1% from last month</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="border-none shadow-md h-full">
                <CardHeader>
                  <CardTitle>Lead Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ChartContainer
                    config={{
                      conversion: {
                        label: "Conversion Rate (%)",
                        color: "hsl(221, 70%, 33%)",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={leadConversionData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                        <Line type="monotone" dataKey="conversion" stroke="var(--color-conversion)" strokeWidth={2} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="border-none shadow-md h-full">
                <CardHeader>
                  <CardTitle>Revenue Growth</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue ($)",
                        color: "hsl(43, 96%, 56%)",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="leads">
          <div className="grid grid-cols-1 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer
                  config={{
                    leads: {
                      label: "Leads",
                      color: "hsl(221, 70%, 33%)",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { source: "Website", leads: 483 },
                        { source: "Referral", leads: 212 },
                        { source: "Social Media", leads: 358 },
                        { source: "Email", leads: 142 },
                        { source: "Events", leads: 89 },
                      ]}
                      margin={{ top: 5, right: 20, bottom: 20, left: 0 }}
                    >
                      <Bar dataKey="leads" fill="var(--color-leads)" radius={[4, 4, 0, 0]} />
                      <XAxis dataKey="source" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tickets">
          <div className="grid grid-cols-1 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Tickets Resolved Per Agent</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer
                  config={{
                    resolved: {
                      label: "Tickets Resolved",
                      color: "hsl(221, 70%, 33%)",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ticketResolutionData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                      <Bar dataKey="resolved" fill="var(--color-resolved)" radius={[4, 4, 0, 0]} />
                      <XAxis dataKey="agent" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
