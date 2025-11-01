import React, { useEffect, useState } from "react";
import CardResumo from "../components/CardResumo"; // Componente do resumo estático
import api from '../services/api'; // Serviço para a chamada à API
import { Card } from 'react-bootstrap'; // Componente Card do React-Bootstrap

export default function RhDashboard() {
  // Estado para armazenar os dados de funcionários carregados da API (do segundo código)
  const [funcionarios, setFuncionarios] = useState([]);

  // Efeito para carregar os dados de RH da API
  useEffect(() => {
    async function carregarFuncionarios() {
      try {
        const response = await api.get('/api/rh');
        setFuncionarios(response.data);
      } catch (error) {
        console.error('Erro ao carregar RH:', error);
      }
    }
    carregarFuncionarios();
  }, []); // Roda apenas uma vez ao montar o componente

  return (
    <div className="container-main">
      {/* Título principal do Dashboard */}
      <h3>Recursos Humanos</h3>
      
      {/* Cards de Resumo Estático */}
      <div className="grid-cards" style={{marginTop:12}}>
        <CardResumo titulo="Colaboradores" valor="58" sub="Ativos: 56" />
        <CardResumo titulo="Admissões (30d)" valor="2" sub="Desligamentos: 0" />
        <CardResumo titulo="Folha (mês)" valor="R$ 124.300" sub="Próx pagamento 30/11" />
      </div>

      <div style={{marginTop:24}}> 
        
        {/* Tabela Estática de Colaboradores em destaque (do primeiro código) */}
        <div className="card-resumo" style={{marginBottom: 30}}>
          <h5 style={{margin:0}}>Colaboradores em Destaque</h5>
          <table className="table-card" style={{marginTop:12}}>
            <thead><tr><th>Nome</th><th>Cargo</th><th>Admissão</th></tr></thead>
            <tbody>
              <tr><td>Mariana Lopes</td><td>Analista</td><td>2023-04-10</td></tr>
              <tr><td>Roberto Dias</td><td>Suporte</td><td>2024-01-22</td></tr>
              <tr><td>Carla Pinto</td><td>Dev</td><td>2022-08-01</td></tr>
            </tbody>
          </table>
        </div>
        
        {/* ---------------------------------------------------- */}
        {/* Listagem Dinâmica de Funcionários Carregados da API */}
        {/* Usamos o estilo do segundo código aqui para listar os cards dinâmicos */}
        <div style={{marginTop: 30}}>
          <h2 style={{marginBottom: 15, marginTop: 15}}>👥 Todos os Colaboradores</h2>
          <div className="row">
            {/* Mapeia os dados de 'funcionarios' carregados da API e exibe como Cards */}
            {funcionarios.map((f, index) => (
              <div key={index} className="col-md-3 mb-3">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{f.nome}</Card.Title>
                    <Card.Text>{f.cargo}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        {/* ---------------------------------------------------- */}

      </div>
    </div>
  );
}