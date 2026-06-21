import ollama from "ollama";

/**
 * FREE LOCAL AI (NO API KEYS)
 */
export async function askAI(prompt) {
  const res = await ollama.chat({
    model: "llama3",
    messages: [
      { role: "user", content: prompt }
    ]
  });

  return res.message.content;
}