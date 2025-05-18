"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { isAuthenticated } from "@/lib/auth"
import { Filter, Plus, Search } from "lucide-react"

export default function LeadsPage() {
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

  // Mock lead data
  const leads = [
    {
      id: 1,
      name: "John Smith",
      company: "Acme Inc.",
      email: "john@acme.com",
      phone: "(555) 123-4567",
      status: "New",
      value: "$12,500",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "TechCorp",
      email: "sarah@techcorp.com",
      phone: "(555) 234-5678",
      status: "Contacted",
      value: "$8,750",
    },
    {
      id: 3,
      name: "Michael Brown",
      company: "Global Solutions",
      email: "michael@globalsolutions.com",
      phone: "(555) 345-6789",
      status: "Qualified",
      value: "$21,000",
    },
    {
      id: 4,
      name: "Emily Davis",
      company: "Innovate LLC",
      email: "emily@innovate.com",
      phone: "(555) 456-7890",
      status: "Proposal",
      value: "$15,300",
    },
    {
      id: 5,
      name: "Robert Wilson",
      company: "Future Tech",
      email: "robert@futuretech.com",
      phone: "(555) 567-8901",
      status: "Negotiation",
      value: "$32,750",
    },
    {
      id: 6,
      name: "Jennifer Lee",
      company: "Bright Ideas",
      email: "jennifer@brightideas.com",
      phone: "(555) 678-9012",
      status: "New",
      value: "$9,500",
    },
    {
      id: 7,
      name: "David Miller",
      company: "Peak Performance",
      email: "david@peakperformance.com",
      phone: "(555) 789-0123",
      status: "Contacted",
      value: "$18,200",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      company: "Elite Services",
      email: "lisa@eliteservices.com",
      phone: "(555) 890-1234",
      status: "Qualified",
      value: "$24,600",
    },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Leads</h1>
          <p className="text-gray-600">Manage and track your sales leads</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search leads..." className="pl-9 w-full sm:w-64" />
          </div>
          <Button className="bg-blue-900 hover:bg-blue-800">
            <Plus className="h-4 w-4 mr-2" /> Add Lead
          </Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-gray-50 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-blue-900">Lead Management</CardTitle>
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
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{lead.name}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-600">{lead.company}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-600">{lead.email}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-600">{lead.phone}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            lead.status === "New"
                              ? "bg-blue-100 text-blue-800"
                              : lead.status === "Contacted"
                                ? "bg-purple-100 text-purple-800"
                                : lead.status === "Qualified"
                                  ? "bg-green-100 text-green-800"
                                  : lead.status === "Proposal"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-600">{lead.value}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm" className="text-blue-900 hover:text-blue-700">
                          Edit
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
