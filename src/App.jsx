import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import CrmDashboard from "./pages/CrmDashboard";
import VendasDashboard from "./pages/VendasDashboard";
import EstoqueDashboard from "./pages/EstoqueDashboard";
import RhDashboard from "./pages/RhDashboard";
import FinanceiroDashboard from "./pages/FinanceiroDashboard";
import ConfiguracoesDashboard from "./pages/ConfiguracoesDashboard";
import MainDashboard from "./pages/MainDashboard";

export default function App(){
  const [page, setPage] = useState("crm");
  const [isDark, setIsDark] = useState(false);

  useEffect(()=>{
    // sempre claro no reload — apenas aplica classe quando o usuário clicar
    if(isDark) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  },[isDark]);

  const renderPage = () => {
    switch(page){
      case "crm": return <CrmDashboard />;
      case "vendas": return <VendasDashboard />;
      case "estoque": return <EstoqueDashboard />;
      case "rh": return <RhDashboard />;
      case "financeiro": return <FinanceiroDashboard />;
      case "main": return <MainDashboard />;
      case "config": return <ConfiguracoesDashboard />;
      default: return <CrmDashboard />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} />
      <div className="app-main">
        <Navbar onToggleDark={() => setIsDark(!isDark)} isDark={isDark} />
        <main style={{flex:1}}>
          { renderPage() }
        </main>
        <div style={{padding:12}}>
          <div className="footer-small">SofiaTech • ERP </div>
        </div>
      </div>
    </div>
  );
}
