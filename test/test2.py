import pyaudio
from openai import OpenAI
import time

def measure_first_chunk_latency(method_type="stream"):
    client = OpenAI(base_url="http://localhost:8880/v1", api_key="not-needed")
    pa = pyaudio.PyAudio()
    player = pa.open(format=pyaudio.paInt16, channels=1, rate=24000, output=True)
    
    start_time = time.time()
    first_chunk_received = None

    with client.audio.speech.with_streaming_response.create(
        model="kokoro",
        voice="af_bella",
        response_format="pcm",
        input="Can I assist with understanding this paragraph?"
    ) as response:
        
        if method_type == "download":
            # Download method: Write to file but track first chunk
            with open("output.pcm", "wb") as f:
                for chunk in response.iter_bytes(1024):
                    if first_chunk_received is None:
                        first_chunk_received = time.time()
                    f.write(chunk)
        else:
            # Streaming method: Direct playback
            for chunk in response.iter_bytes(1024):
                if first_chunk_received is None:
                    first_chunk_received = time.time()
                player.write(chunk)

    return first_chunk_received - start_time

# Usage
print(f"Stream first chunk: {measure_first_chunk_latency('stream'):.2f}s")
print(f"Download first chunk: {measure_first_chunk_latency('download'):.2f}s")
