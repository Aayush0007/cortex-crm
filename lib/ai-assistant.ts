// This is a mock implementation. In a real app, you would integrate with an AI service.

interface AIResponse {
  type: "message" | "lead-recommendation" | "task-summary"
  content: string
}

export async function getAIResponse(prompt: string): Promise<AIResponse> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check prompt for keywords to determine response type
  if (prompt.toLowerCase().includes("lead") || prompt.toLowerCase().includes("customer")) {
    return {
      type: "lead-recommendation",
      content: `Based on your interaction patterns and customer data, I recommend focusing on the following leads:
      
1. **TechCorp** - They've shown interest in your premium plan and have visited the pricing page 5 times this week.
2. **Innovate LLC** - Their current contract is expiring in 30 days. This is a good time to discuss renewal options.
3. **Global Solutions** - They've had positive interactions with customer support recently and might be ready for an upsell.`,
    }
  } else if (prompt.toLowerCase().includes("task") || prompt.toLowerCase().includes("summarize")) {
    return {
      type: "task-summary",
      content: `Here's a summary of your most important tasks:

1. **High Priority** - Follow up with John Smith (Acme Inc.) about their enterprise proposal
2. **High Priority** - Prepare for the quarterly review meeting on Friday
3. **Medium Priority** - Resolve the technical issue reported by TechCorp
4. **Medium Priority** - Update the sales presentation with the new product features`,
    }
  } else {
    return {
      type: "message",
      content: `I'm your AI assistant, here to help you with CRM tasks, customer insights, and recommendations. Here are some things I can do for you:

- Analyze customer data for insights
- Draft responses to common inquiries
- Suggest follow-up actions for leads
- Summarize customer interactions
- Prioritize your tasks based on importance and urgency

Feel free to ask me anything about your leads, tickets, or general CRM tasks!`,
    }
  }
}

export function getSmartReplySuggestions(conversation: string[]): string[] {
  // In a real implementation, this would analyze the conversation and generate contextually appropriate replies
  return [
    "Thanks for reaching out. I'll look into this right away.",
    "I understand your concern. Let me check with my team and get back to you by tomorrow.",
    "That's great news! I'd love to schedule a call to discuss this further.",
    "Could you provide more details about your specific requirements?",
  ]
}

export function getSentimentAnalysis(text: string): { sentiment: "positive" | "negative" | "neutral"; score: number } {
  // In a real implementation, this would use NLP to analyze sentiment
  const positiveWords = ["happy", "pleased", "great", "excellent", "good", "wonderful", "amazing", "fantastic"]
  const negativeWords = ["upset", "disappointed", "angry", "unhappy", "bad", "terrible", "awful", "poor"]

  const words = text.toLowerCase().split(/\s+/)

  let positiveCount = 0
  let negativeCount = 0

  words.forEach((word) => {
    if (positiveWords.includes(word)) positiveCount++
    if (negativeWords.includes(word)) negativeCount++
  })

  if (positiveCount > negativeCount) {
    return { sentiment: "positive", score: 0.7 + Math.random() * 0.3 }
  } else if (negativeCount > positiveCount) {
    return { sentiment: "negative", score: 0.7 + Math.random() * 0.3 }
  } else {
    return { sentiment: "neutral", score: 0.4 + Math.random() * 0.2 }
  }
}
