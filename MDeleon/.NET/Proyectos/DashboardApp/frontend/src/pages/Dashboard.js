import { useEffect, useState } from 'react';
import { getEmbedInfo } from '../services/ReportService';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) {
      navigate('/');
      return;
    }
    getEmbedInfo(t).then(res => {
      setUrl(res.data.embedUrl);
      setToken(res.data.embedToken);
    });
  }, []);

  return (
    <div>
      <h2>Reporte Power BI</h2>
      <iframe
        title="Power BI"
        width="100%"
        height="600"
        frameBorder="0"
        allowFullScreen
        src={`${url}&embedToken=${token}`}
      />
    </div>
  );
}
