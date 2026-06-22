import fetch from "node-fetch";

export async function streamAI(prompt, onToken) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt,
      stream: true
    })
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let fullText = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter(Boolean);

    for (const line of lines) {
      try {
        const json = JSON.parse(line);

        if (json.response) {
          fullText += json.response;
          onToken(json.response);
        }
      } catch {}
    }
  }

  return fullText;
}