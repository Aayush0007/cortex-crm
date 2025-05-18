"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { isAuthenticated } from "@/lib/auth"
import { Filter, Plus, Search } from "lucide-react"

export default function TicketsPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    )
  }

  // Mock ticket data
  const tickets = [
    {
      id: 1,
      subject: "Login issues after password reset",
      customer: "John Smith",
      company: "Acme Inc.",
      priority: "High",
      status: "Open",
      created: "2 hours ago",
      assignee: "Support Team",
    },
    {
      id: 2,
      subject: "Feature request: Export to CSV",
      customer: "Sarah Johnson",
      company: "TechCorp",
      priority: "Medium",
      status: "In Progress",
      created: "1 day ago",
      assignee: "Product Team",
    },
    {
      id: 3,
      subject: "Dashboard not loading correctly",
      customer: "Michael Brown",
      company: "Global Solutions",
      priority: "High",
      status: "Open",
      created: "3 hours ago",
      assignee: "Technical Support",
    },
    {
      id: 4,
      subject: "Billing discrepancy on latest invoice",
      customer: "Emily Davis",
      company: "Innovate LLC",
      priority: "Medium",
      status: "Pending",
      created: "2 days ago",
      assignee: "Billing Team",
    },
    {
      id: 5,
      subject: "API integration documentation unclear",
      customer: "Robert Wilson",
      company: "Future Tech",
      priority: "Low",
      status: "In Progress",
      created: "5 days ago",
      assignee: "Developer Relations",
    },
    {
      id: 6,
      subject: "Mobile app crashing on startup",
      customer: "Jennifer Lee",
      company: "Bright Ideas",
      priority: "High",
      status: "Open",
      created: "1 hour ago",
      assignee: "Mobile Team",
    },
    {
      id: 7,
      subject: "Need assistance with data migration",
      customer: "David Miller",
      company: "Peak Performance",
      priority: "Medium",
      status: "Open",
      created: "4 hours ago",
      assignee: "Data Team",
    },
    {
      id: 8,
      subject: "Request for additional user licenses",
      customer: "Lisa Anderson",
      company: "Elite Services",
      priority: "Low",
      status: "Pending",
      created: "3 days ago",
      assignee: "Account Manager",
    },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Tickets</h1>
          <p className="text-gray-600">Manage customer support tickets</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search tickets..." className="pl-9 w-full sm:w-64" />
          </div>
          <Button className="bg-blue-900 hover:bg-blue-800">
            <Plus className="h-4 w-4 mr-2" /> Create Ticket
          </Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-gray-50 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-blue-900">Support Tickets</CardTitle>
              <Button variant="outline" size="sm" className="text-gray-600">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assignee
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="font-medium text-gray-900">{ticket.subject}</div>
                        <div className="text-sm text-gray-500">{ticket.company}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-600">{ticket.customer}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            ticket.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : ticket.priority === "Medium"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            ticket.status === "Open"
                              ? "bg-blue-100 text-blue-800"
                              : ticket.status === "In Progress"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-600">{ticket.created}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-600">{ticket.assignee}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm" className="text-blue-900 hover:text-blue-700">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
