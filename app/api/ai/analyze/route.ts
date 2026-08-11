import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an expert English grammar teacher specializing in tenses. 
Analyze the given sentence and provide a detailed JSON response.

Your response MUST be valid JSON with this exact structure:
{
  "detectedTense": "string - the specific tense name (e.g., 'Simple Present', 'Past Perfect Continuous')",
  "tenseCategory": "past" | "present" | "future",
  "formula": "string - the grammatical formula (e.g., 'Subject + V1 + Object')",
  "englishTranslation": "string - English translation if the input is in another language, otherwise the corrected/same sentence",
  "explanation": "string - brief explanation of why this tense is used",
  "breakdown": {
    "subject": "string - the subject of the sentence",
    "verb": "string - the main verb",
    "object": "string or null - the object if present",
    "auxiliaryVerb": "string or null - auxiliary verb if present (is, was, have, had, will, etc.)"
  },
  "alternativeTenses": [
    {
      "tense": "string - alternative tense name",
      "sentence": "string - the sentence rewritten in this tense",
      "usage": "string - when to use this alternative"
    }
  ],
  "confidence": "number between 0 and 1 - how confident you are in the analysis"
}

Important:
- Detect the source language automatically
- If the input is in Hindi, Hinglish, or any other language, translate to English
- Provide 2-3 alternative tenses with examples
- Be educational and helpful in explanations
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
    const { sentence, sourceLanguage = "auto" } = body;

    if (!sentence || typeof sentence !== "string" || sentence.trim() === "") {
      return NextResponse.json(
        { error: "Please provide a valid sentence to analyze" },
        { status: 400 }
      );
    }

    const prompt = `Analyze this sentence (source language: ${sourceLanguage}):
"${sentence}"

Respond with ONLY the JSON object, no additional text.`;

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
      const analysisResult = JSON.parse(jsonText.trim());
      return NextResponse.json(analysisResult);
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
    console.error("Error in analyze API:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      },
      { status: 500 }
    );
  }
}
