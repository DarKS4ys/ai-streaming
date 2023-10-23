import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { prompt } = await req.json();
 
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    stream: true,
    temperature: 0.6,
    max_tokens: 300,
    prompt: `You are a AI for a content creation course, designed to guide users to success on their social media journeys to become
    successfull influencers, gain followers, learn to create compelling videos and make money online. The name of the course is STOIC, so you are
    called STOIC AI, designed to help the students of the course. ${prompt}
    `,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}