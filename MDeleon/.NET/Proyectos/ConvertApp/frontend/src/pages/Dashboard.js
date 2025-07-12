import { useState } from "react";
import ConverterService from "../services/ConverterService";

function Dashboard() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  const convert = async () => {
    const res = await ConverterService.convert(from, to, amount);
    setResult(res);
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <input value={from} onChange={(e) => setFrom(e.target.value)} />
      <input value={to} onChange={(e) => setTo(e.target.value)} />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={convert}>Convert</button>
      {result && <p>Resultado: {result}</p>}
    </div>
  );
}

export default Dashboard;
