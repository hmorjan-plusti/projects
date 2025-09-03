import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [form, setForm] = useState({ total: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    getOrders()
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error cargando órdenes:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/orders", {
        total: parseFloat(form.total),
      });
      setOrders([...orders, res.data]);
      setForm({ total: "" });
    } catch (err) {
      setError("Error al crear orden.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mis Órdenes</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="total"
          type="number"
          placeholder="Total"
          value={form.total}
          onChange={handleChange}
          required
        />
        <button>Agregar</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: '8px' }}>{error}</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {orders.map((order, i) => (
          <div key={i} style={{ minWidth: 250, border: '1px solid #ccc', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #eee' }}>
            <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>Orden #{order.id}</div>
            <div style={{ color: '#555', marginBottom: 4 }}>Fecha: {order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'}</div>
            <div style={{ fontSize: 16, marginBottom: 8 }}><span style={{ fontWeight: 'bold' }}>Total:</span> <span style={{ color: '#1976d2' }}>${order.total}</span></div>
            <div style={{ marginBottom: 4, fontWeight: 'bold' }}>Productos:</div>
            {order.products && order.products.length > 0 ? (
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                {order.products.map((product: any) => (
                  <li key={product.id} style={{ marginBottom: 2 }}>
                    <span style={{ fontWeight: 'bold' }}>{product.name}</span> <span style={{ color: '#888' }}>(${product.price})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <span style={{ color: 'gray' }}>Sin productos</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}