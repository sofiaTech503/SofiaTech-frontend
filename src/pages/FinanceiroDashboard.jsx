import { useEffect, useState } from 'react';
import api from '../services/api';
import { Table } from 'react-bootstrap';

export default function FinanceiroDashboard() {
  const [resumo, setResumo] = useState(null);
  const [fluxo, setFluxo] = useState([]);

  useEffect(() => {
    async function carregarFinanceiro() {
      try {
        const r = await api.get('/api/financeiro');        // espera objeto resumo
        const f = await api.get('/api/financeiro/fluxo'); // rota opcional para fluxo detalhado
        setResumo(r.data);
        setFluxo(Array.isArray(f.data) ? f.data : []);
      } catch (error) {
        console.error('Erro ao carregar financeiro:', error);
      }
    }
    carregarFinanceiro();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">💳 Financeiro</h2>

      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <div className="card shadow-sm p-3">
            <div className="text-muted">Saldo Caixa</div>
            <div style={{fontSize:20,fontWeight:800}}>
              {resumo ? `R$ ${Number(resumo.saldo || 0).toLocaleString('pt-BR')}` : 'R$ 0,00'}
            </div>
            <small className="text-muted">Disponível</small>
          </div>
        </div>

        <div className="col-md-4 mb-2">
          <div className="card shadow-sm p-3">
            <div className="text-muted">Contas a Receber</div>
            <div style={{fontSize:20,fontWeight:800}}>
              {resumo ? `R$ ${Number(resumo.receber || 0).toLocaleString('pt-BR')}` : 'R$ 0,00'}
            </div>
            <small className="text-muted">Vencendo</small>
          </div>
        </div>

        <div className="col-md-4 mb-2">
          <div className="card shadow-sm p-3">
            <div className="text-muted">Contas a Pagar</div>
            <div style={{fontSize:20,fontWeight:800}}>
              {resumo ? `R$ ${Number(resumo.pagar || 0).toLocaleString('pt-BR')}` : 'R$ 0,00'}
            </div>
            <small className="text-muted">Vencendo</small>
          </div>
        </div>
      </div>

      <div className="card shadow-sm p-3">
        <h5>Fluxo (últimos lançamentos)</h5>
        <Table striped bordered hover responsive className="mt-2">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {fluxo.length > 0 ? (
              fluxo.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.data}</td>
                  <td>{row.descricao}</td>
                  <td>{row.tipo}</td>
                  <td>{`R$ ${Number(row.valor).toLocaleString('pt-BR')}`}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">Nenhum lançamento encontrado.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
