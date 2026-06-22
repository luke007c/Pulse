export async function pipeline(input) {

  return {
    success: true,
    input,
    stage: "pipeline_working",
    message: "Core pipeline is connected correctly"
  };

}