import { ImageResponse } from "next/og";

export const alt =
  "VTR Import C.A. — Distribuidor al mayor de repuestos y accesorios para motos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0B0B",
          color: "#FFFFFF",
          padding: 64,
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 520,
            height: 630,
            backgroundColor: "#1E6B1E",
            transform: "skewX(-18deg) translateX(-160px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 330,
            width: 70,
            height: 630,
            backgroundColor: "#F5A300",
            transform: "skewX(-18deg)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 76,
              height: 76,
              backgroundColor: "#F5A300",
              color: "#0B0B0B",
              fontSize: 30,
              fontWeight: 900,
              fontStyle: "italic",
            }}
          >
            VTR
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 22,
              letterSpacing: 6,
              color: "#F5A300",
            }}
          >
            <span>IMPORT C.A.</span>
            <span style={{ color: "#FFFFFF", opacity: 0.65, fontSize: 16 }}>
              DISTRIBUCIÓN AL MAYOR
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              fontStyle: "italic",
              lineHeight: 0.92,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            REPUESTOS, CAUCHOS Y ACCESORIOS PARA MOTOS
          </div>
          <div style={{ fontSize: 30, color: "#F4F4F2", opacity: 0.8 }}>
            Compra al mayor en toda Venezuela · Cotiza por WhatsApp
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(255,255,255,0.18)",
            paddingTop: 20,
            fontSize: 20,
            color: "#F4F4F2",
            opacity: 0.75,
          }}
        >
          <span>Repuestos · Cauchos · Cascos · Accesorios · Carrocería · Baterías</span>
          <span style={{ color: "#F5A300", fontWeight: 700 }}>
            Atención B2B
          </span>
        </div>
      </div>
    ),
    size,
  );
}
