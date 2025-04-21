import axios from "axios";
import { useState, useEffect } from "react";

export default function TextBlock({ phrase }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState(null);

  async function download() {
    setLoading(true);
    try {
      const response = await axios.post(
        //"http://192.168.178.22:8880/v1/audio/speech",
        "http://localhost:8880/v1/audio/speech",
        {
          model: "kokoro",
          voice: "am_liam",
          input: phrase,
        },
        {
          responseType: "blob",
          timeout: 30000,
        },
      );

      if (response.status === 200) {
        setLoading(false);
        setAudio(new Audio(URL.createObjectURL(response.data)));
      }
    } catch (err) {
      setLoading(false);
      setError({
        message: err.message,
        code: err.code || err.response?.status,
        stack: err.stack,
      });
    }
  }

  useEffect(() => {
    download();
  }, []);

  return error ? (
    <div className="text-block">
      <p>{error.message}</p>
    </div>
  ) : loading || audio === null ? (
    <div className="text-block">
      <p>Loading...</p>
    </div>
  ) : (
    <div className="text-block">
      <p>{phrase}</p>
      <button
        onClick={() => {
          audio.play();
        }}
      >
        Play
      </button>
    </div>
  );
}
