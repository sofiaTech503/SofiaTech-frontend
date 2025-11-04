import React, { useEffect, useState } from "react";
import CardResumo from "../components/CardResumo"; // Componente de resumo do primeiro código
import api from '../services/api'; // Serviço de API do segundo código
import { Table } from 'react-bootstrap'; // Componente de tabela do segundo código

// Componente MiniSpark do primeiro código (gráfico simples SVG)
function MiniSpark() {
  // small sparkline simple SVG
  return (
    <svg className="spark" viewBox="0 0 120 28" preserveAspectRatio="none">
      <polyline points="0,18 20,12 40,10 60,8 80,6 100,9 120,4" fill="none" stroke="#0d6efd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VendasDashboard() {
  // Estado para armazenar os dados de vendas, vindo do segundo código
  const [vendas, setVendas] = useState([]);

  // Efeito para carregar os dados de vendas da API, vindo do segundo código
  useEffect(() => {
    async function carregarVendas() {
      try {
        const response = await api.get('/api/vendas');
        setVendas(response.data);
      } catch (error) {
        console.error('Erro ao carregar vendas:', error);
      }
    }
    carregarVendas();
  }, []); // O array vazio garante que rode apenas uma vez ao montar.

  return (
    <div className="container-main">
      <h3>Vendas — Painel</h3>
      
      {/* Seção de Cards de Resumo */}
      <div className="grid-cards" style={{marginTop:12}}>
        <CardResumo titulo="Faturamento Mês" valor="R$ 412.300" sub="+8% (mês)" />
        <CardResumo titulo="Pedidos" valor="1.248" sub="Em aberto: 34" />
        <CardResumo titulo="Ticket Médio" valor="R$ 330,50" sub="Meta: R$ 350" />
      </div>

      {/* Seção de Gráfico e Top Produtos */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 340px", gap:12, marginTop:12}}>
        {/* Card de Evolução/Gráfico */}
        <div className="card-resumo">
          <h5 style={{margin:0}}>Evolução (últimos 7 dias)</h5>
          <div style={{marginTop:12}}>
            <MiniSpark />
          </div>
          <div style={{marginTop:12, display:"flex", gap:12}}>
            <div className="box-primary">
              <small>Receita</small>
              <div style={{fontWeight:800}}>R$ 412.300</div>
            </div>
            <div className="box-accent">
              <small>Margem</small>
              <div style={{fontWeight:800}}>21%</div>
            </div>
          </div>
        </div>

        {/* Card de Top Produtos */}
        <div className="card-resumo">
          <h5 style={{margin:0}}>Top produtos</h5>
          <ul style={{marginTop:12,listStyle:"none",padding:0}}>
            <li style={{padding:8,borderBottom:"1px solid rgba(0,0,0,0.04)"}}>Camiseta Azul — 320 un</li>
            <li style={{padding:8,borderBottom:"1px solid rgba(0,0,0,0.04)"}}>Tênis Corrida — 188 un</li>
            <li style={{padding:8}}>Boné Preto — 140 un</li>
          </ul>
        </div>
      </div>
      
      {/* ---------------------------------------------------- */}
      {/* Seção de Tabela Dinâmica de Vendas Carregadas da API */}
      {/* Usei 'container-main' do primeiro código em vez de 'container mt-4' para manter o estilo uniforme */}
      <div style={{marginTop: 30}}>
        <h2 style={{marginBottom: 15}}>📝 Detalhes das Vendas Recentes</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Valor (R$)</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.cliente}</td>
                {/* Formatação para duas casas decimais */}
                <td>{typeof v.valor === 'number' ? v.valor.toFixed(2) : v.valor}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* ---------------------------------------------------- */}
    </div>
  );
}