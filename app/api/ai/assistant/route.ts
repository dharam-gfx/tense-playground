import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a friendly and helpful English grammar assistant for the Tense Playground app.
You specialize in teaching English tenses, grammar rules, and helping users improve their English skills.

Your response MUST be valid JSON with this exact structure:
{
  "reply": "string - your helpful response to the user's question",
  "suggestions": ["array of strings - 2-4 follow-up questions the user might ask"],
  "relatedTopics": ["array of strings - related grammar topics they might want to explore"]
}

Guidelines:
- Be encouraging and supportive
- Use simple, clear explanations
- Provide examples when helpful
- Focus on tenses and English grammar
- If asked about non-grammar topics, gently redirect to grammar learning
- Return ONLY valid JSON, no markdown or extra text`;

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Google AI API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { question, context } = body;

    if (!question || typeof question !== "string" || question.trim() === "") {
      return NextResponse.json(
        { error: "Please provide a valid question" },
        { status: 400 }
      );
    }

    let prompt = "";
    
    if (context) {
      prompt += `Context: ${context}\n\n`;
    }
    
    prompt += `User's question: "${question}"\n\nRespond with ONLY the JSON object, no additional text.`;

    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    const text = response.text ?? "";
    
    // Extract JSON from the response
    let jsonText = text;
    
    // Remove markdown code blocks if present
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }
    
    // Try to parse the JSON
    try {
      const assistantResponse = JSON.parse(jsonText.trim());
      return NextResponse.json(assistantResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response:", text);
      return NextResponse.json(
        { 
          error: "Failed to parse AI response",
          rawResponse: text 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in assistant API:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      },
      { status: 500 }
    );
  }
}
