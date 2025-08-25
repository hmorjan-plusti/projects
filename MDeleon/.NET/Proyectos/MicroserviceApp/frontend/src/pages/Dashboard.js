export default function Dashboard() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      {token ? <p>Authenticated</p> : <p>Unauthorized</p>}
    </div>
  );
}
