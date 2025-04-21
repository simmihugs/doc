import pyaudio
from openai import OpenAI
import time

def main():
    client = OpenAI(base_url="http://localhost:8880/v1", api_key="not-needed")
    text = "Can I assist with understanding this paragraph?"
    
    pa = pyaudio.PyAudio()
    player = pa.open(
        format=pyaudio.paInt16,
        channels=1,
        rate=24000,
        output=True
    )

    dl_start = time.time()
    
    with client.audio.speech.with_streaming_response.create(
        model="kokoro",
        voice="af_sky+af_bella",
        response_format="pcm",
        input=text
    ) as response:
        response.stream_to_file("output.pcm")    
    dl_end = time.time()

    stream_start = time.time()
    stream_end = stream_start
    started = False
    with client.audio.speech.with_streaming_response.create(
        model="kokoro",
        voice="af_bella",
        response_format="pcm",
        input="Can I assist with understanding this paragraph?"
    ) as response:
        for chunk in response.iter_bytes(chunk_size=1024):
            if not started:
                stream_end = time.time()
            started = True
            player.write(chunk)

    print(f"Download total: {dl_end - dl_start:.2f}s")
    print(f"Stream total: {stream_end - stream_start:.2f}s")

if __name__ == '__main__':
    main()
