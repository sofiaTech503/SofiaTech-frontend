import React from "react";
import { Sun, Moon } from "react-bootstrap-icons";

export default function Navbar({ onToggleDark, isDark }) {
  return (
    <div className="app-topbar">
      <div className="brand-title">
        <div style={{width:36,height:36,borderRadius:8,background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800}}>
          S
        </div>
        <div>
          <div style={{fontSize:14}}>ERP SofiaTech</div>
          <div style={{fontSize:12,color:"var(--muted)"}}>Painel Administrativo</div>
        </div>
      </div>

      <div className="top-actions">
        <button
          className="btn-ghost"
          title="Alternar modo"
          onClick={onToggleDark}
          style={{display:"flex",alignItems:"center",gap:8}}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />} 
        </button>

        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:14,fontWeight:700}}>Wesley</div>
            <div style={{fontSize:12,color:"var(--muted)"}}>Administrador</div>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="avatar" style={{width:38,height:38,borderRadius:8,border:"2px solid rgba(0,0,0,0.04)"}} />
        </div>
      </div>
    </div>
  );
}
