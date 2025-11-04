import React from "react";
import { House, Cart, Box, People, Wallet, Gear, PersonVcard } from "react-bootstrap-icons";

const MenuItem = ({ icon, label, active, onClick }) => (
  <button className={`btn ${active ? "active" : ""}`} onClick={onClick} style={{width:"100%", background:"transparent", color:"inherit", border:0, padding:10}}>
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <div style={{width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.06)",borderRadius:8}}>
        {icon}
      </div>
      <div style={{fontWeight:600}}>{label}</div>
    </div>
  </button>
);

export default function Sidebar({ page, setPage }) {
  return (
    <aside className="app-sidebar">
      <div className="brand">
        <div className="logo">ST</div>
        <div>
          <div style={{fontWeight:800}}>SofiaTech</div>
          <div style={{fontSize:12, color:"rgba(255,255,255,0.8)"}}>ERP</div>
        </div>
      </div>

      <div className="menu">
        <MenuItem icon={<House />} label="Início" active={page==="main"} onClick={()=>setPage("main")} />
        <MenuItem icon={<PersonVcard />} label="CRM" active={page==="crm"} onClick={()=>setPage("crm")} />
        <MenuItem icon={<Cart />} label="Vendas" active={page==="vendas"} onClick={()=>setPage("vendas")} />
        <MenuItem icon={<Box />} label="Estoque" active={page==="estoque"} onClick={()=>setPage("estoque")} />
        <MenuItem icon={<People />} label="RH" active={page==="rh"} onClick={()=>setPage("rh")} />
        <MenuItem icon={<Wallet />} label="Financeiro" active={page==="financeiro"} onClick={()=>setPage("financeiro")} />
        <MenuItem icon={<Gear />} label="Configurações" active={page==="config"} onClick={()=>setPage("config")} />
      </div>

      <div style={{marginTop:20, padding:"0 .5rem"}}>
        <small style={{color:"rgba(255,255,255,0.7)"}}>Versão 0.1 • SofiaTech</small>
      </div>
    </aside>
  );
}
