import { useEffect, useState } from "react";
import { getUsers } from "../api/users";

export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <ul className="space-y-2">
        {users.map((u) => (
          <li key={u.id} className="p-2 border rounded-lg">
            {u.name} - {u.email} ({u.role})
          </li>
        ))}
      </ul>
    </div>
  );
}
