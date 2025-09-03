import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import api from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/products", {
        name: form.name,
        price: parseFloat(form.price),
      });
      setProducts([...products, res.data]);
      setForm({ name: "", price: "" });
    } catch (err) {
      setError("Error al crear producto.");
    }
  };

  const handleSelect = (id: number) => {
    setSelected(selected.includes(id)
      ? selected.filter((pid) => pid !== id)
      : [...selected, id]);
  };

  const handleCreateOrder = async () => {
    if (selected.length === 0) return;
    const selectedProducts = products.filter((p) => selected.includes(p.id));
    const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);
    try {
      await api.post("/orders", {
        total,
        products: selectedProducts.map((p) => p.id),
      });
      setSelected([]);
      alert("Orden creada correctamente");
    } catch (err) {
      setError("Error al crear orden.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button>Agregar</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: '8px' }}>{error}</div>}
      <ul className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <li key={p.id} className="p-4 border rounded-lg shadow-sm">
            <h2 className="font-semibold">{p.name}</h2>
            <p>${p.price}</p>
            <button onClick={() => handleSelect(p.id)}>
              {selected.includes(p.id) ? "Quitar de orden" : "Agregar a orden"}
            </button>
          </li>
        ))}
      </ul>
      {selected.length > 0 && (
        <button onClick={handleCreateOrder} style={{ marginTop: '16px' }}>
          Crear orden con productos seleccionados
        </button>
      )}
    </div>
  );
}
