import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an expert translator specializing in educational translations.
Translate the given text and provide grammar insights.

Your response MUST be valid JSON with this exact structure:
{
  "originalText": "string - the original input text",
  "translatedText": "string - the translated text",
  "sourceLanguage": "string - detected or specified source language",
  "targetLanguage": "string - the target language",
  "tenseUsed": "string or null - the tense used in the sentence (e.g., 'Simple Present', 'Past Continuous')",
  "formula": "string or null - the grammar formula for the tense (e.g., 'Subject + V1 + Object', 'Subject + was/were + V1+ing')",
  "grammarNotes": ["array of strings - helpful grammar notes about the translation"]
}

Important:
- Maintain natural, fluent translation
- Preserve the original meaning and tone
- Add helpful grammar notes for learners
- Identify the tense if applicable and provide its formula
- For formulas, use standard notation: V1 (base form), V2 (past form), V3 (past participle), V1+ing (gerund)
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
    const { text, targetLanguage, sourceLanguage = "auto" } = body;

    if (!text || typeof text !== "string" || text.trim() === "") {
      return NextResponse.json(
        { error: "Please provide valid text to translate" },
        { status: 400 }
      );
    }

    if (!targetLanguage) {
      return NextResponse.json(
        { error: "Please specify a target language" },
        { status: 400 }
      );
    }

    const prompt = `Translate this text:
Original: "${text}"
From: ${sourceLanguage}
To: ${targetLanguage}

Respond with ONLY the JSON object, no additional text.`;

    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    const responseText = response.text ?? "";
    
    // Extract JSON from the response
    let jsonText = responseText;
    
    // Remove markdown code blocks if present
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }
    
    // Try to parse the JSON
    try {
      const translationResult = JSON.parse(jsonText.trim());
      return NextResponse.json(translationResult);
    } catch (parseError) {
      console.error("Failed to parse AI response:", responseText);
      return NextResponse.json(
        { 
          error: "Failed to parse AI response",
          rawResponse: responseText 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in translate API:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      },
      { status: 500 }
    );
  }
}
