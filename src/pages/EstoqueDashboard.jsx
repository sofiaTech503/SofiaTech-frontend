import React, { useEffect, useState } from "react";
import CardResumo from "../components/CardResumo"; // Componente do resumo estático
import api from '../services/api'; // Serviço para a chamada à API
import { Table } from 'react-bootstrap'; // Componente de tabela do React-Bootstrap

export default function EstoqueDashboard() {
  // Estado para armazenar os dados de produtos carregados da API (do segundo código)
  const [produtos, setProdutos] = useState([]);

  // Efeito para carregar os dados de estoque da API
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await api.get('/api/estoque');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao carregar estoque:', error);
      }
    }
    carregarProdutos();
  }, []); // Roda apenas uma vez ao montar o componente

  return (
    <div className="container-main">
      {/* Título principal do Dashboard */}
      <h3>Estoque — Controle</h3>
      
      {/* Cards de Resumo Estático */}
      <div className="grid-cards" style={{marginTop:12}}>
        <CardResumo titulo="Itens no estoque" valor="2.420" sub="SKU únicos 420" />
        <CardResumo titulo="Itens em falta" valor="42" sub="Alerta: 12 críticos" />
        <CardResumo titulo="Valor do estoque" valor="R$ 184.900" sub="Custo médio" />
      </div>

      {/* Seção de Conteúdo (Tabela de Movimentações + Tabela Dinâmica) */}
      <div style={{marginTop:12}}>
        
        {/* Tabela Estática de Movimentações Recentes (do primeiro código) */}
        <div className="card-resumo" style={{marginBottom: 30}}>
          <h5 style={{margin:0}}>Movimentações Recentes</h5>
          <table className="table-card" style={{marginTop:12}}>
            <thead>
              <tr><th>Produto</th><th>Tipo</th><th>Qtd</th><th>Data</th></tr>
            </thead>
            <tbody>
              <tr><td>Camiseta Azul</td><td>Entrada</td><td>50</td><td>2025-10-20</td></tr>
              <tr><td>Tênis Corrida</td><td>Saída</td><td>2</td><td>2025-10-21</td></tr>
              <tr><td>Boné Preto</td><td>Entrada</td><td>20</td><td>2025-10-21</td></tr>
            </tbody>
          </table>
        </div>
        
        {/* Tabela Dinâmica de Produtos no Estoque (do segundo código) */}
        {/* Usamos o 'container-main' como wrapper principal e ajustamos o estilo aqui */}
        <div>
          <h2 style={{marginBottom: 15, marginTop: 15}}>📦 Produtos no Estoque</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeia os dados de 'produtos' carregados da API */}
              {produtos.map((p, index) => (
                // Usamos 'index' como key alternativa caso 'p' não tenha um ID único
                <tr key={index}> 
                  <td>{p.produto}</td>
                  <td>{p.qtd}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        
      </div>
    </div>
  );
}