// lib/huggingface.ts

export const generateScriptFromHF = async (name: string) => {
  const prompt = `Write a short, engaging, storytelling-style script of 60-90 seconds about the life and career of ${name} for a sports fan reel.`;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    }
  );

  const result = await response.json();

  return result[0]?.generated_text || "No script generated.";
};
