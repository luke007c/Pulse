const events = [];

export function logClick(event) {
  events.push({
    ...event,
    time: new Date().toISOString()
  });

  console.log("📊 TRACK:", event);
}

export function getEvents() {
  return events;
}