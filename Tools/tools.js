export const tools = {
  calculator: ({ a, b, op }) => {
    const x = Number(a);
    const y = Number(b);

    switch (op) {
      case "add": return x + y;
      case "sub": return x - y;
      case "mul": return x * y;
      case "div": return y !== 0 ? x / y : null;
      default: return null;
    }
  },

  timestamp: () => {
    return {
      now: new Date().toISOString()
    };
  }
};