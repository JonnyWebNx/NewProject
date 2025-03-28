import dotenv from "dotenv";
import OpenAI from "openai";
import { AppError } from "../utils/errors";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const functions = [
  {
    type: "function" as const,
    function: {
      name: "generateProblem",
      description:
        "Generates a coding problem with test cases and a JavaScript solution",
      parameters: {
        type: "object",
        properties: {
          problemDescription: {
            type: "string",
            description: "A description of the coding problem",
          },
          testCases: {
            type: "array",
            description: "List of test cases",
            items: {
              type: "object",
              properties: {
                input: { type: "string", description: "Input for the test case" },
                expectedOutput: {
                  type: "string",
                  description: "Expected output for the test case",
                },
              },
              required: ["input", "expectedOutput"],
            },
          },
          solution: {
            type: "string",
            description: "The solution code in JavaScript",
          },
        },
        required: ["problemDescription", "testCases", "solution"],
      },
    },
  },
];

export async function generateCodingProblemHelper(): Promise<string> {
  console.log("inside generateCodingProblemHelper");
  const prompt = `Generate a simple coding problem in valid JSON format. Do not include any additional text outside of the JSON object.
    The JSON should adhere exactly to the following schema:
    {
      "problemDescription": "A description of the problem.",
      "testCases": [
        { "input": "Test case 1 input", "expectedOutput": "Test case 1 output" },
        { "input": "Test case 2 input", "expectedOutput": "Test case 2 output" }
      ],
      "solution": "The solution code in JavaScript, as a string."
    }`;

  try {
    console.log("Generating coding problem...");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that generates coding problems with test cases and solutions in JavaScript.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      tools: functions,
      tool_choice: "auto",
      max_tokens: 500,
      temperature: 0.7,
    });

    // Check if the model returned a tool call with arguments.
    const message = response.choices?.[0]?.message;
    let generatedContent;

    if (message?.tool_calls?.[0]?.function?.arguments) {
      try {
        generatedContent = JSON.parse(message.tool_calls[0].function.arguments);
      } catch (err) {
        console.error("JSON parsing error from tool_calls.function.arguments:", err);
        throw new AppError("Error parsing generated JSON", 404);
      }
    } else if (message?.content) {
      try {
        generatedContent = JSON.parse(message.content);
      } catch (err) {
        console.error("JSON parsing error from message.content:", err);
        throw new AppError("Error parsing generated JSON", 404);
      }
    }

    console.log("generatedContent", generatedContent);
    if (!generatedContent) {
      throw new AppError("No content generated", 404);
    }
    // Return the structured JSON as a string.
    return JSON.stringify(generatedContent);
  } catch (error) {
    console.log("error in generateCodingProblemHelper", error);
    throw new AppError("Error generating coding problem", 404);
  }
}
