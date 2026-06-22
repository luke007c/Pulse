export class PipelineTimer {
  constructor(totalSteps = 3) {
    this.start = Date.now();
    this.totalSteps = totalSteps;
    this.currentStep = 0;
  }

  step(name) {
    this.currentStep++;

    const elapsed = (Date.now() - this.start) / 1000;
    const avgPerStep = elapsed / this.currentStep;
    const remaining = avgPerStep * (this.totalSteps - this.currentStep);

    return {
      step: name,
      progress: Math.round((this.currentStep / this.totalSteps) * 100),
      elapsed: `${elapsed.toFixed(1)}s`,
      eta: `${remaining.toFixed(1)}s`
    };
  }
}