"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, LineChart, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your CortexCRM dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Leads"
          value="1,284"
          change="+12.5%"
          positive={true}
          icon={<Users className="h-8 w-8 text-blue-900" />}
          delay={0}
        />
        <MetricCard
          title="Open Tickets"
          value="42"
          change="-8.3%"
          positive={true}
          icon={<BarChart2 className="h-8 w-8 text-blue-900" />}
          delay={0.1}
        />
        <MetricCard
          title="Revenue"
          value="$128,450"
          change="+23.1%"
          positive={true}
          icon={<LineChart className="h-8 w-8 text-blue-900" />}
          delay={0.2}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityCard delay={0.3} />
        <UpcomingTasksCard delay={0.4} />
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  positive: boolean
  icon: React.ReactNode
  delay: number
}

function MetricCard({ title, value, change, positive, icon, delay }: MetricCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className={`text-sm ${positive ? "text-green-600" : "text-red-600"}`}>{change} from last month</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function RecentActivityCard({ delay }: { delay: number }) {
  const activities = [
    { id: 1, type: "New Lead", name: "John Smith", company: "Acme Inc.", time: "2 hours ago" },
    { id: 2, type: "Ticket Closed", name: "Sarah Johnson", company: "TechCorp", time: "4 hours ago" },
    { id: 3, type: "Deal Won", name: "Michael Brown", company: "Global Solutions", time: "Yesterday" },
    { id: 4, type: "New Ticket", name: "Emily Davis", company: "Innovate LLC", time: "Yesterday" },
    { id: 5, type: "Meeting Scheduled", name: "Robert Wilson", company: "Future Tech", time: "2 days ago" },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <Card className="border-none shadow-md h-full">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <div className="h-2 w-2 rounded-full bg-blue-900"></div>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.type}</p>
                  <p className="text-sm text-gray-600">
                    {activity.name} • {activity.company}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function UpcomingTasksCard({ delay }: { delay: number }) {
  const tasks = [
    { id: 1, title: "Follow up with John Smith", priority: "High", due: "Today" },
    { id: 2, title: "Prepare proposal for TechCorp", priority: "Medium", due: "Tomorrow" },
    { id: 3, title: "Schedule demo with Innovate LLC", priority: "High", due: "Tomorrow" },
    { id: 4, title: "Review quarterly sales targets", priority: "Medium", due: "In 2 days" },
    { id: 5, title: "Update customer onboarding materials", priority: "Low", due: "Next week" },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <Card className="border-none shadow-md h-full">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">Upcoming Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div
                  className={`h-3 w-3 rounded-full ${
                    task.priority === "High"
                      ? "bg-red-500"
                      : task.priority === "Medium"
                        ? "bg-amber-400"
                        : "bg-green-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">Due: {task.due}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
