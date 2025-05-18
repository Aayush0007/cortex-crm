"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Key, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    email: true,
    push: true,
    leads: true,
    tickets: true,
    system: false,
  })

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Key className="h-4 w-4" /> Password
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Demo" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="User" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="user@cortexcrm.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" defaultValue="Sales Manager" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Sales" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-blue-900">Save Changes</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="password">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-blue-900">Update Password</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage your notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="font-medium">Notification Methods</div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Email Notifications</div>
                      <div className="text-sm text-gray-500">Receive notifications via email</div>
                    </div>
                    <Switch
                      checked={notificationsEnabled.email}
                      onCheckedChange={(checked) => setNotificationsEnabled((prev) => ({ ...prev, email: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Push Notifications</div>
                      <div className="text-sm text-gray-500">Receive notifications in-app</div>
                    </div>
                    <Switch
                      checked={notificationsEnabled.push}
                      onCheckedChange={(checked) => setNotificationsEnabled((prev) => ({ ...prev, push: checked }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="font-medium">Notification Types</div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Lead Updates</div>
                      <div className="text-sm text-gray-500">New leads and lead status changes</div>
                    </div>
                    <Switch
                      checked={notificationsEnabled.leads}
                      onCheckedChange={(checked) => setNotificationsEnabled((prev) => ({ ...prev, leads: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Ticket Updates</div>
                      <div className="text-sm text-gray-500">New tickets and status changes</div>
                    </div>
                    <Switch
                      checked={notificationsEnabled.tickets}
                      onCheckedChange={(checked) => setNotificationsEnabled((prev) => ({ ...prev, tickets: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>System Notifications</div>
                      <div className="text-sm text-gray-500">System updates and maintenance</div>
                    </div>
                    <Switch
                      checked={notificationsEnabled.system}
                      onCheckedChange={(checked) => setNotificationsEnabled((prev) => ({ ...prev, system: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-blue-900">Save Preferences</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Enable Two-Factor Authentication</div>
                      <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
                    </div>
                    <Button variant="outline">Setup 2FA</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="font-medium">Session Management</div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div>Active Sessions</div>
                      <div className="text-sm text-gray-500">
                        Manage devices that are currently signed in to your account
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-medium">Current Session</div>
                          <div className="text-sm text-gray-500">Windows • Chrome • New York, USA</div>
                        </div>
                        <div className="text-sm text-green-600">Active Now</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Mobile App</div>
                          <div className="text-sm text-gray-500">iOS • iPhone • Last active 2 hours ago</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="font-medium">Login History</div>
                  <div className="text-sm text-gray-500 mb-2">Recent login activity for your account</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Today at 10:24 AM</div>
                        <div className="text-sm text-gray-500">Chrome on Windows • New York, USA</div>
                      </div>
                      <div className="text-sm text-green-600">Successful</div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Yesterday at 3:15 PM</div>
                        <div className="text-sm text-gray-500">Safari on iOS • Chicago, USA</div>
                      </div>
                      <div className="text-sm text-green-600">Successful</div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">June 12, 2023 at 9:47 AM</div>
                        <div className="text-sm text-gray-500">Firefox on MacOS • Unknown Location</div>
                      </div>
                      <div className="text-sm text-red-600">Failed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="destructive" className="mr-2">
                  Sign Out All Devices
                </Button>
                <Button className="bg-blue-900">Save Changes</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
