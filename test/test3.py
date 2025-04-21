import requests
import time

def test_streaming():
    start_time = time.time()
    chunk_times = []
    
    response = requests.post(
        "http://localhost:8880/v1/audio/speech",
        json={
            "input": "The quick brown fox jumps over the lazy dog. " * 5,
            "voice": "af_bella",
            "response_format": "pcm",
            "model": "kokoro"
        },
        stream=True
    )

    print(f"Connection established: {time.time() - start_time:.3f}s")
    
    for i, chunk in enumerate(response.iter_content(1024)):
        received_at = time.time() - start_time
        chunk_times.append((i+1, received_at))
        
        print(f"Chunk {i+1} received at: {received_at:.3f}s")
        if i == 0:
            first_chunk_latency = received_at

    print("\nSummary:")
    print(f"First chunk latency: {first_chunk_latency:.3f}s")
    print(f"Total chunks: {len(chunk_times)}")
    print(f"Total duration: {time.time() - start_time:.3f}s")

if __name__ == "__main__":
    test_streaming()
