import axios from 'axios';

// 1. OBTER A URL DA VARIÁVEL DE AMBIENTE
// O Vite injeta variáveis que começam com VITE_ no objeto import.meta.env
// Se a variável VITE_API_URL não existir (o que não deve acontecer no Vercel),
// ele usa uma URL local (apenas para desenvolvimento local seguro).
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// 2. CRIAR INSTÂNCIA DO AXIOS
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // Exemplo de header comum
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout de 10 segundos
});

// Função para buscar os dados do dashboard principal
export const fetchDashboardData = async () => {
  try {
    // 3. DEFINIR O ENDPOINT CORRETO
    // Assumindo que você tem um endpoint de resumo do dashboard
    const response = await api.get('/api/dashboard/resumo'); 
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    // Retorna dados de fallback ou lança o erro
    return null; 
  }
};

// Função para buscar dados do gráfico de Vendas Mensais
export const fetchVendasMensais = async () => {
  try {
    const response = await api.get('/api/vendas/mensais'); 
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vendas mensais:", error);
    return [];
  }
};

export default api;
