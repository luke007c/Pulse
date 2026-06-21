async function run() {

  const res = await fetch("http://localhost:3001/api/pipeline/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "demo-key"
    },
    body: JSON.stringify({
      input: "find gyms in london"
    })
  });

  const data = await res.json();

  document.getElementById("out").innerText =
    JSON.stringify(data, null, 2);
}

async function buy() {

  const res = await fetch("http://localhost:3001/api/billing/checkout", {
    method: "POST"
  });

  const data = await res.json();

  window.location.href = data.url;
}