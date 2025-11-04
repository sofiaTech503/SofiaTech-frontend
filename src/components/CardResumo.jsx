import React from "react";

export default function CardResumo({ titulo, valor, sub, variant }) {
  // variant: "primary" | "accent" | undefined
  const cls = "card-resumo";
  return (
    <div className={cls}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div>
          <div style={{fontSize:12, color:"var(--muted)", fontWeight:700}}>{titulo}</div>
          <div style={{marginTop:6, fontSize:20, fontWeight:800}}>{valor}</div>
        </div>
        <div>
          <div style={{fontSize:12, color:"var(--muted)", textAlign:"right"}}>{sub}</div>
        </div>
      </div>
    </div>
  );
}
