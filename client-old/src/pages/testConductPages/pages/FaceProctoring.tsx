import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const FaceVerification: React.FC = () => {
    const webcamRef = useRef<Webcam | null>(null);
    const [selfie, setSelfie] = useState<string | null>(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [matchStatus, setMatchStatus] = useState<string>("⏳ Waiting for verification...");

    // Load FaceAPI models
    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
            await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
            await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
            setIsModelLoaded(true);
        };
        loadModels();
    }, []);

    // Retrieve stored selfie from local storage
    useEffect(() => {
        const storedSelfie = localStorage.getItem("capturedSelfie");
        if (storedSelfie) setSelfie(storedSelfie);
    }, []);

    // Face verification logic
    useEffect(() => {
        if (!isModelLoaded || !selfie) return;

        const interval = setInterval(async () => {
            if (webcamRef.current && webcamRef.current.video?.readyState === 4) {
                const video = webcamRef.current.video;
                const selfieImg = await faceapi.fetchImage(selfie);

                // Detect all faces in live video
                const detectionsVideo = await faceapi.detectAllFaces(video!, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
                const detectionsSelfie = await faceapi.detectSingleFace(selfieImg, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

                if (!detectionsSelfie) {
                    setMatchStatus("⚠️ Selfie Not Detected");
                    return;
                }

                if (detectionsVideo.length === 0) {
                    setMatchStatus("⚠️ No Face Detected");
                } else if (detectionsVideo.length > 1) {
                    setMatchStatus("🚨 Multiple Faces Detected! Violation ❌");
                } else {
                    // Compare only if one face is detected
                    const distance = faceapi.euclideanDistance(detectionsVideo[0].descriptor, detectionsSelfie.descriptor);
                    setMatchStatus(distance < 0.6 ? "✅ Matched" : "❌ Not Matched");
                }
            }
        }, 2000); // Run every 2 seconds

        return () => clearInterval(interval);
    }, [isModelLoaded, selfie]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <h2 className="text-3xl font-semibold mb-4">Face Verification</h2>

            {/* Webcam */}
            <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-xl border border-gray-300 shadow-lg">
                <Webcam ref={webcamRef} className="w-full" />
            </div>

            {/* Status */}
            <div className={`mt-6 px-6 py-3 rounded-lg text-xl font-semibold ${
                matchStatus.includes("Matched") ? "bg-green-500" 
                : matchStatus.includes("Multiple Faces") ? "bg-yellow-500"
                : "bg-red-500"
            }`}>
                {matchStatus}
            </div>
        </div>
    );
};

export default FaceVerification;
