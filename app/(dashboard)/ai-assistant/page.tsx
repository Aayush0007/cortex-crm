"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain, MessageSquare, Send, Share2, ThumbsDown, ThumbsUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { getAIResponse, getSmartReplySuggestions, getSentimentAnalysis } from "@/lib/ai-assistant"

interface Message {
  role: "user" | "assistant"
  content: string
  type?: "message" | "lead-recommendation" | "task-summary"
  timestamp: Date
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [emailDraft, setEmailDraft] = useState("")
  const [emailSentiment, setEmailSentiment] = useState<{
    sentiment: "positive" | "negative" | "neutral"
    score: number
  } | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function handleSendMessage(e?: React.FormEvent) {
    e?.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await getAIResponse(input)

      const assistantMessage: Message = {
        role: "assistant",
        content: response.content,
        type: response.type,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)

      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  function formatTimestamp(date: Date): string {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleEmailAnalysis = () => {
    if (!emailDraft.trim()) return
    setEmailSentiment(getSentimentAnalysis(emailDraft))
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">AI Assistant</h1>
        <p className="text-gray-600">Get smart insights, recommendations, and automate routine tasks</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Chat Assistant
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" /> Email Writer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-none shadow-md col-span-2">
              <CardHeader className="border-b">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-blue-900">CortexCRM Assistant</CardTitle>
                    <CardDescription>Powered by AI</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] overflow-y-auto p-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div
                          className={`rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 ${
                            message.role === "user" ? "bg-blue-900 ml-3" : "bg-gray-100 mr-3"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Brain className="h-4 w-4 text-blue-900" />
                          )}
                        </div>
                        <div>
                          <div
                            className={`rounded-lg px-4 py-2 mb-1 ${
                              message.role === "user" ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {message.type === "lead-recommendation" || message.type === "task-summary" ? (
                              <div className="prose prose-sm max-w-none whitespace-pre-line">
                                {message.content.split("\n").map((line, i) => (
                                  <p key={i} className={`${i === 0 ? "mt-0" : "mt-2"} mb-0`}>
                                    {line}
                                  </p>
                                ))}
                              </div>
                            ) : (
                              message.content
                            )}
                          </div>
                          <div
                            className={`text-xs text-gray-500 ${message.role === "user" ? "text-right" : "text-left"}`}
                          >
                            {formatTimestamp(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <div className="flex">
                        <div className="rounded-full h-8 w-8 bg-gray-100 flex items-center justify-center mr-3">
                          <Brain className="h-4 w-4 text-blue-900" />
                        </div>
                        <div className="rounded-lg bg-gray-100 px-4 py-2 flex items-center">
                          <div className="flex space-x-1">
                            <div
                              className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                            <div
                              className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "600ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                  <Input
                    placeholder="Ask for insights, recommendations, or help with tasks..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-blue-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => {
                      setInput("Give me lead recommendations based on recent activity")
                      handleSendMessage()
                    }}
                  >
                    Get lead recommendations
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => {
                      setInput("Summarize my tasks and prioritize them")
                      handleSendMessage()
                    }}
                  >
                    Summarize tasks
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => {
                      setInput("Draft a follow-up email for a customer who hasn't responded in 2 weeks")
                      handleSendMessage()
                    }}
                  >
                    Draft follow-up email
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => {
                      setInput("Analyze customer sentiment from recent support tickets")
                      handleSendMessage()
                    }}
                  >
                    Analyze customer sentiment
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-blue-900">Smart Reply Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {getSmartReplySuggestions([]).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto whitespace-normal py-2"
                      onClick={() => {
                        setInput(suggestion)
                        handleSendMessage()
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="email">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-none shadow-md col-span-2">
              <CardHeader>
                <CardTitle className="text-blue-900">Email Writer</CardTitle>
                <CardDescription>Draft professional emails with AI assistance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Write your email draft here..."
                  className="min-h-[200px]"
                  value={emailDraft}
                  onChange={(e) => setEmailDraft(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button onClick={handleEmailAnalysis}>Analyze Sentiment</Button>
                </div>
                {emailSentiment && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium mb-2">Email Sentiment Analysis</p>
                    <div className="flex items-center gap-2">
                      <div
                        className={`rounded-full p-2 ${
                          emailSentiment.sentiment === "positive"
                            ? "bg-green-100"
                            : emailSentiment.sentiment === "negative"
                              ? "bg-red-100"
                              : "bg-gray-100"
                        }`}
                      >
                        {emailSentiment.sentiment === "positive" ? (
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                        ) : emailSentiment.sentiment === "negative" ? (
                          <ThumbsDown className="h-4 w-4 text-red-600" />
                        ) : (
                          <Share2 className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {emailSentiment.sentiment === "positive"
                            ? "Positive tone"
                            : emailSentiment.sentiment === "negative"
                              ? "Negative tone"
                              : "Neutral tone"}
                        </p>
                        <p className="text-xs text-gray-500">Score: {Math.round(emailSentiment.score * 100)}%</p>
                      </div>
                    </div>
                    <div className="mt-4 text-sm">
                      {emailSentiment.sentiment === "positive" ? (
                        <p className="text-green-700">
                          Your email has a positive tone, which is great for building rapport.
                        </p>
                      ) : emailSentiment.sentiment === "negative" ? (
                        <p className="text-red-700">
                          Your email has a negative tone. Consider revising to make it more positive.
                        </p>
                      ) : (
                        <p className="text-gray-700">
                          Your email has a neutral tone, which is professional and appropriate.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="gap-2 justify-between border-t pt-4">
                <Button variant="outline">Save Draft</Button>
                <Button className="bg-blue-900">Generate Improved Version</Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-blue-900">Email Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() =>
                      setEmailDraft(
                        "Dear [Name],\n\nI hope this email finds you well. I'm reaching out regarding our recent discussion about [Topic]. I wanted to follow up and see if you have any questions or if you need additional information.\n\nLooking forward to your response.\n\nBest regards,\n[Your Name]",
                      )
                    }
                  >
                    Follow-up Email
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() =>
                      setEmailDraft(
                        "Dear [Name],\n\nThank you for your interest in our services. I'm delighted to provide you with a proposal for [Service/Product].\n\nBased on our discussion, I've outlined the key points below:\n- [Point 1]\n- [Point 2]\n- [Point 3]\n\nPlease let me know if you would like to proceed or if you need any clarification.\n\nBest regards,\n[Your Name]",
                      )
                    }
                  >
                    Sales Proposal
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() =>
                      setEmailDraft(
                        "Dear [Name],\n\nThank you for contacting our support team. I understand you're experiencing an issue with [Problem].\n\nI've investigated the matter and found that [Explanation]. To resolve this, please try the following steps:\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]\n\nIf you continue to experience issues, please don't hesitate to contact me directly.\n\nBest regards,\n[Your Name]",
                      )
                    }
                  >
                    Customer Support
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() =>
                      setEmailDraft(
                        "Dear [Name],\n\nI hope you're doing well. I'm writing to invite you to a meeting on [Date] at [Time] to discuss [Topic].\n\nAgenda:\n- [Item 1]\n- [Item 2]\n- [Item 3]\n\nPlease confirm your availability at your earliest convenience.\n\nBest regards,\n[Your Name]",
                      )
                    }
                  >
                    Meeting Invitation
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-blue-900">Writing Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-900"></div>
                      </div>
                      <span>Keep subject lines clear and concise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-900"></div>
                      </div>
                      <span>Open with a professional greeting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-900"></div>
                      </div>
                      <span>Be direct about your purpose</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-900"></div>
                      </div>
                      <span>Use bullet points for clarity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-900"></div>
                      </div>
                      <span>End with a clear call to action</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
