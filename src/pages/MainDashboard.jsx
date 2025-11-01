// src/pages/MainDashboard.jsx (Usando Bootstrap)
import React, { useEffect, useState } from "react";
import { TrendingUp, ShoppingCart, Users, Package, CreditCard } from "lucide-react";
import axios from "../services/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, Row, Col, Table } from 'react-bootstrap'; // Importando componentes do React-Bootstrap

const MainDashboard = () => {
  const [stats, setStats] = useState({
    vendas: 0,
    estoque: 0,
    funcionarios: 0,
    saldoFinanceiro: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Dados Mock (a serem substituídos por chamadas reais)
        const mockStats = {
          vendas: 1240,
          estoque: 342,
          funcionarios: 28,
          saldoFinanceiro: 57300,
        };

        const mockChart = [
          { mes: "Mai", vendas: 9000 },
          { mes: "Jun", vendas: 11000 },
          { mes: "Jul", vendas: 9500 },
          { mes: "Ago", vendas: 12500 },
          { mes: "Set", vendas: 13900 },
          { mes: "Out", vendas: 15200 },
        ];

        setStats(mockStats);
        setChartData(mockChart);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: "Vendas",
      value: `R$ ${stats.vendas.toLocaleString('pt-BR')}`,
      icon: <ShoppingCart className="w-6 h-6" style={{ color: '#0d6efd' }} />, // text-blue-600
    },
    {
      title: "Produtos em Estoque",
      value: stats.estoque,
      icon: <Package className="w-6 h-6" style={{ color: '#198754' }} />, // text-green-600
    },
    {
      title: "Funcionários Ativos",
      value: stats.funcionarios,
      icon: <Users className="w-6 h-6" style={{ color: '#6f42c1' }} />, // text-purple-600
    },
    {
      title: "Saldo Financeiro",
      value: `R$ ${stats.saldoFinanceiro.toLocaleString('pt-BR')}`,
      icon: <CreditCard className="w-6 h-6" style={{ color: '#ffc107' }} />, // text-yellow-600
    },
  ];

  return (
    // Usa 'container-fluid' para ocupar a largura total, e utilitários de espaçamento (p-4, bg-light)
    <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 className="h3 mb-4 text-gray-800">
        Dashboard Principal - ERP SofiaTech
      </h1>

      {/* 🔹 KPIs */}
      <Row className="g-4 mb-4">
        {cards.map((card, index) => (
          <Col xs={12} md={3} key={index}> {/* grid-cols-4 => col-md-3 */}
            <Card className="shadow-sm border-0 h-100 transition-shadow">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted text-sm mb-1">{card.title}</p>
                    <h2 className="fs-4 fw-bold mt-0">{card.value}</h2>
                  </div>
                  <div className="p-3 bg-light rounded-circle">
                    {card.icon}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 🔹 Gráfico */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h2 className="card-title h5 text-gray-700 mb-4 d-flex align-items-center">
            <TrendingUp className="me-2" style={{ width: 20, height: 20, color: '#6610f2' }} /> {/* text-indigo-600 */}
            Vendas Mensais
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
              <XAxis dataKey="mes" stroke="#6c757d" />
              <YAxis stroke="#6c757d" />
              <Tooltip formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Vendas']} />
              <Line
                type="monotone"
                dataKey="vendas"
                stroke="#6610f2" // Cor primária adaptada
                strokeWidth={3}
                dot={{ r: 5, fill: '#6610f2' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      {/* 🔹 Resumo financeiro */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h2 className="card-title h5 text-gray-700 mb-1">
            Resumo Financeiro
          </h2>
          <p className="text-muted text-sm mb-4">
            Contas a pagar e receber dos últimos 30 dias.
          </p>
          
          <Row className="g-4">
            {/* Contas a Receber */}
            <Col xs={12} md={6}>
              <div className="p-4 rounded border border-success-subtle bg-success-subtle"> {/* bg-green-50 */}
                <p className="text-success fw-medium mb-1">Contas a Receber</p>
                <h3 className="fs-4 fw-bold text-success-emphasis mt-1">
                  R$ 24.500,00
                </h3>
              </div>
            </Col>
            {/* Contas a Pagar */}
            <Col xs={12} md={6}>
              <div className="p-4 rounded border border-danger-subtle bg-danger-subtle"> {/* bg-red-50 */}
                <p className="text-danger fw-medium mb-1">Contas a Pagar</p>
                <h3 className="fs-4 fw-bold text-danger-emphasis mt-1">
                  R$ 12.300,00
                </h3>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MainDashboard;