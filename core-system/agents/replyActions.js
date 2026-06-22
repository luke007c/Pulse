export function decideNextAction(category) {

  switch (category) {

    case "interested":
      return "schedule_call";

    case "follow_up_later":
      return "send_followup";

    case "not_interested":
      return "archive";

    case "question":
      return "ai_reply";

    default:
      return "ignore";
  }
}