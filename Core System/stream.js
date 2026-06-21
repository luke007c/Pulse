export async function streamAI(prompt, onToken) {
  const res = await fetch("YOUR_LLM_ENDPOINT", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      stream: true
    })
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let full = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    full += chunk;

    onToken(chunk);
  }

  return full;
}