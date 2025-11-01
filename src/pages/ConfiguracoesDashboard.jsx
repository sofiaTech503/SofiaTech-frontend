import { useEffect, useState } from 'react';
import api from '../services/api';
import { Form, Button } from 'react-bootstrap';

export default function ConfiguracoesDashboard() {
  const [params, setParams] = useState({});

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get('/api/configuracoes');
        // espera um objeto { chave: valor } ou um array; adaptamos conforme backend
        setParams(res.data || {});
      } catch (err) {
        console.error('Erro ao carregar configurações:', err);
      }
    }
    carregar();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // exemplo: envia para backend para salvar (endpoint precisa existir)
      await api.post('/api/configuracoes', params);
      alert('Parâmetros salvos (mock).');
    } catch (err) {
      console.error('Erro ao salvar:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">⚙️ Configurações do Sistema</h2>

      <div className="card shadow-sm p-3">
        <Form onSubmit={handleSave}>
          <Form.Group className="mb-3">
            <Form.Label>Nome do sistema</Form.Label>
            <Form.Control
              value={params.nome_sistema || 'ERP SofiaTech'}
              onChange={(e) => setParams({ ...params, nome_sistema: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Idioma</Form.Label>
            <Form.Select
              value={params.idioma || 'pt-BR'}
              onChange={(e) => setParams({ ...params, idioma: e.target.value })}
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">Salvar</Button>
            <Button variant="outline-secondary" onClick={() => setParams({})}>Restaurar</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
