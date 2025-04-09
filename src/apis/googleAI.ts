/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Google AI API
 */

import { GoogleGenAI } from '@google/genai'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

const generateProjectTask = async (prompt: string) => {
  try {
    const result = `Generate and return a list of tasks based on the providing prompt and the given JSON schema:

		Prompt: ${prompt}
    Task Schema:
		{
			content: string, // The content of the task
			due_date: Date | null, // The due date of the task or null if no due date is provided
		}
		Requirements:
		1. Ensure the tasks are relevant to the prompt
		2. Set the 'due_date' relative to today's date: ${new Date()}
		3. Return an array of tasks matching the schema in pure JSON format without any markdown formatting
		4. Do not include any markdown code block markers (\`\`\`) in the response

		Output: Array<Task>`

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: result
    })

    if (!response.text) {
      return '[]'
    }

    // Clean up the response text by removing markdown code block markers and any whitespace
    const cleanedText = response.text.replace(/```json\n?|```/g, '').trim()

    return cleanedText
  } catch (error) {
    console.error('Error generating project task:', error)
    return '[]'
  }
}
export { generateProjectTask }
