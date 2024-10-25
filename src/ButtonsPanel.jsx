// ButtonsPanel.jsx
import React from 'react';
import { Icon } from "@iconify-icon/react";
import DownloadButton from './DownloadButton';

const ButtonsPanel = ({ onLayout, setEdgeType }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    <button
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => onLayout({ direction: "DOWN" })}
    >
      <img src="/assets/images/reactflow/icons/vertical.svg" style={{ width: "100%", height: "100%" }} />
    </button>
    <button
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => onLayout({ direction: "RIGHT" })}
    >
      <img src="/assets/images/reactflow/icons/horizontal.svg" style={{ width: "100%", height: "100%" }} />
    </button>
    <div style={{ height: "1px", backgroundColor: "#D3D3D3", margin: "5px 0" }} />
    <button
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => setEdgeType("straight")}
    >
      <img src="/assets/images/reactflow/icons/straight.svg" style={{ width: "100%", height: "100%" }} />
    </button>
    <button
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => setEdgeType("step")}
    >
      <img src="/assets/images/reactflow/icons/steps.svg" style={{ width: "100%", height: "100%" }} />
    </button>
    <button
      style={{
        width: "45px",
        height: "45px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => setEdgeType("smoothstep")}
    >
      <img src="/assets/images/reactflow/icons/smoothsteps.svg" style={{ width: "100%", height: "100%" }} />
    </button>
    <button
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => setEdgeType("bezier")}
    >
      <img src="/assets/images/reactflow/icons/bezier.svg" style={{ width: "100%", height: "100%" }} />
    </button>
    <div style={{ height: "1px", backgroundColor: "#D3D3D3", margin: "5px 0" }} />
    <DownloadButton />
  </div>
);

export default ButtonsPanel;
