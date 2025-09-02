import { useEffect, useState } from "react";
import { getReports } from "../api/reports";

export default function Reports() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    getReports().then(setReports);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reportes</h1>
      <ul className="space-y-3">
        {reports.map((r) => (
          <li key={r.id} className="p-4 border rounded-lg">
            <h2 className="font-semibold">{r.title}</h2>
            <p>{r.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
