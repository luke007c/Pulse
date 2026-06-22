export async function askAI(prompt, onToken) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3",
      prompt: prompt,
      stream: false
    })
  });

  const data = await res.json();

  const text = data.response || "";

  // optional streaming simulation (keeps your system working unchanged)
  if (onToken) {
    for (const word of text.split(" ")) {
      onToken(word + " ");
      await new Promise(r => setTimeout(r, 5));
    }
  }

  return text;
}