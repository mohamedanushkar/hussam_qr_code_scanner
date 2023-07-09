import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import axios from "axios";

export default function Home() {
  const ref = useRef(null);
  const [scanner, setScanner] = useState(null);
  const [status, setStatus] = useState(false);
  const [data, setData] = useState([]);
  const [scaned_item, setScanned] = useState(null);

  useEffect(() => {
    setScanner(
      new QrScanner(ref.current, (result) => setQrData(result), {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        maxScansPerSecond: 2,
      })
    );
  }, []);

  useEffect(() => {
    let isThere = data.findIndex((x) => x === scaned_item);
    isThere == -1 &&
      scaned_item &&
      setData((prevState) => [...prevState, scaned_item]);
  }, [scaned_item]);

  const scan = () => {
    status ? scanner.stop() : scanner.start();
    setStatus((prv) => !prv);
  };

  const setQrData = (result) => {
    setScanned(result.data);
  };

  const sendTobDB = () => {
    axios
      .post("/api/hello", data)
      .then(function (response) {
        alert("data entered successfully");
      })
      .catch(function (error) {
        alert("Failed");
      });

    setData([]);
  };

  return (
    <>
      <Head>
        <title>QR Code Scanner</title>
      </Head>
      <div className="flex items-center flex-col h-full p-4 overflow-y-scroll scrollar-thin scrollar-thum-gray-900 scrollar-track-gray-100">
        <utton
          onClick={scan}
          className="text-white cursor-pointer bg-green-900 mt-4 py-1 px-3 rounded-sm"
        >
          {status ? "Stop" : "Scan"}
        </utton>
        <video
          className="aspect-video bg-gray-500 md:w-1/3 w-full rounded mt-4"
          ref={ref}
        ></video>

        <p className="my-3">Results</p>
        <ul>
          {data.map((dt) => (
            <li className="text-white">{dt}</li>
          ))}
        </ul>
        {data.length > 0 && (
          <button
            onClick={sendTobDB}
            className="text-white cursor-pointer bg-green-900 mt-4 py-1 px-3 rounded-sm"
          >
            Send to DB
          </button>
        )}
      </div>
    </>
  );
}
