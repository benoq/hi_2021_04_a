// import logo from './logo.svg';
import './App.css';

import React, { useRef } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import {drawHand} from "./visualization";

function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load()
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 100);
  }

  runHandpose();

  const detect = async (net) => {
    // check for available input data from the camera
    if (typeof webcamRef.current !== "undefined"
      && webcamRef.current !== null
      && webcamRef.current.video.readyState === 4) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      console.log(hand);

      // Draw mesh
      const canvasContext = canvasRef.current.getContext("2d");
      drawHand(hand, canvasContext);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            width: "640",
            height: "480"
          }} />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            width: "640",
            height: "480"
          }} />
      </header>
    </div>
  );
}

export default App;
