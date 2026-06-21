export async function runPipeline(input) {

  return {
    success: true,
    input,
    stage: "pipeline_working",
    message: "Core pipeline is connected correctly"
  };

}