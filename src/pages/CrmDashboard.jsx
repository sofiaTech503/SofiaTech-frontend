import React, { useEffect, useState } from "react";
import CardResumo from "../components/CardResumo"; // Importação do primeiro código
import api from '../services/api'; // Importação do segundo código (para a API)
import { Card } from 'react-bootstrap'; // Importação do segundo código (se estiver usando React-Bootstrap)

// Certifique-se de que todos os componentes e serviços importados estão disponíveis em seus respectivos caminhos.

export default function CrmDashboard() {
  // Estado para armazenar os clientes, vindo do segundo código
  const [clientes, setClientes] = useState([]);

  // useEffect para carregar os clientes da API, vindo do segundo código
  useEffect(() => {
    async function carregarClientes() {
      try {
        const response = await api.get('/api/crm');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    }
    carregarClientes();
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez, no montagem do componente.

  return (
    // Estrutura principal do primeiro código
    <div className="container-main">
      {/* Título de Resumo (do primeiro código) */}
      <h3>CRM — Resumo</h3>
      
      {/* Cards de Resumo (do primeiro código) */}
      <div className="grid-cards" style={{marginTop:12}}>
        <CardResumo titulo="Clientes Ativos" valor="1.280" sub="+3% mês" />
        <CardResumo titulo="Leads (30d)" valor="342" sub="Qualificados: 78" />
        <CardResumo titulo="Conversões" valor="18%" sub="Meta 25%" />
      </div>

      <div style={{marginTop:18, display:"grid", gap:12}}>
        {/* Tabela de Leads Recentes (do primeiro código) */}
        <div className="card-resumo">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <h5 style={{margin:0}}>Leads recentes</h5>
              <small style={{color:"var(--muted)"}}>Últimos contatos</small>
            </div>
            <div style={{fontWeight:700}}>Ver tudo</div>
          </div>

          <table className="table-card" style={{marginTop:12}}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Status</th>
                <th>Valor estimado</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>João Silva</td><td>Em negociação</td><td>R$ 12.400</td></tr>
              <tr><td>Ana Costa</td><td>Contato inicial</td><td>R$ 3.200</td></tr>
              <tr><td>Empresa XYZ</td><td>Fechado</td><td>R$ 98.000</td></tr>
            </tbody>
          </table>
        </div>
        
        {/* Início da seção de listagem dinâmica de clientes (do segundo código) */}
        <div className="container mt-4">
          <h2 className="mb-4">📋 Clientes Carregados</h2>
          <div className="row">
            {/* Mapeamento e exibição dos clientes carregados da API */}
            {clientes.map((c) => (
              <div key={c.Id} className="col-md-4 mb-3">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{c.Nome}</Card.Title>
                    <Card.Text>
                      <strong>Email:</strong> {c.Email} <br />
                      <strong>Telefone:</strong> {c.Telefone}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        {/* Fim da seção de listagem dinâmica de clientes */}

      </div>
    </div>
  );
}