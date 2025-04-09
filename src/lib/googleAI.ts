/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Google AI API
 */

import { GoogleGenAI } from '@google/genai'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

export async function model() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: 'Explain how AI works in a few words'
  })
  console.log(response.text)
}
