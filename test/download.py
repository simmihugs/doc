from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8880/v1", api_key="not-needed"
)

with client.audio.speech.with_streaming_response.create(
    model="kokoro",
    voice="af_sky+af_bella",
    input="Can I assist with understanding this paragraph?"
  ) as response:
      response.stream_to_file("output.mp3")
