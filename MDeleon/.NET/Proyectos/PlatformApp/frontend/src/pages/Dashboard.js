import React, { useEffect, useState } from "react";
import { uploadDataset, getDatasets } from "../services/datasetService";
import { trainModel, predict } from "../services/mlService";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [datasets, setDatasets] = useState([]);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState({ feature1: "", feature2: "" });
  const [prediction, setPrediction] = useState(null);
  const [message, setMessage] = useState("");
  const [isTraining, setIsTraining] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = async () => {
    try {
      const res = await getDatasets();
      setDatasets(res.data);
    } catch (err) {
      setMessage("❌ Failed to load datasets.");
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        setMessage("⚠️ Please select a file.");
        return;
      }
      await uploadDataset(file);
      await loadDatasets();
      setFile(null);
      setMessage("✅ Dataset uploaded successfully.");
    } catch (err) {
      setMessage("❌ Error uploading dataset.");
    }
  };

  const handleTrain = async () => {
    setIsTraining(true);
    setMessage("⏳ Training model...");
    try {
      await trainModel([
        { feature1: 1.0, feature2: 2.0, label: 5.0 },
        { feature1: 2.0, feature2: 3.0, label: 7.0 },
        { feature1: 3.0, feature2: 4.0, label: 9.0 }
      ]);
      setMessage("✅ Model trained successfully.");
    } catch (err) {
      setMessage("❌ Error training model.");
    } finally {
      setIsTraining(false);
    }
  };

  const handlePredict = async () => {
    if (!input.feature1 || !input.feature2) {
      setMessage("⚠️ Please enter both features.");
      return;
    }

    try {
      const res = await predict({
        feature1: parseFloat(input.feature1),
        feature2: parseFloat(input.feature2)
      });
      setPrediction(res.data.score);
      setMessage("✅ Prediction completed.");
      setInput({ feature1: "", feature2: "" });
    } catch (err) {
      setMessage("❌ Error during prediction.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={handleLogout}>Logout</button>

      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload Dataset</button>
        <button onClick={handleTrain} disabled={isTraining}>
          {isTraining ? "Training..." : "Train Model"}
        </button>
      </div>

      <h3>Make Prediction</h3>
      <input
        type="number"
        placeholder="Feature 1"
        value={input.feature1}
        onChange={(e) => setInput({ ...input, feature1: e.target.value })}
      />
      <input
        type="number"
        placeholder="Feature 2"
        value={input.feature2}
        onChange={(e) => setInput({ ...input, feature2: e.target.value })}
      />
      <button onClick={handlePredict}>Predict</button>

      {prediction !== null && (
        <p><strong>Prediction Result:</strong> {prediction}</p>
      )}

      {message && <p><em>{message}</em></p>}

      <h3>Your Datasets</h3>
      <ul>
        {datasets.map((d, index) => (
          <li key={index}>{d.name}</li>
        ))}
      </ul>
    </div>
  );
}
