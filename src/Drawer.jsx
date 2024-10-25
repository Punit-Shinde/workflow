// Drawer.jsx
import React from 'react';
import { Icon } from "@iconify-icon/react";
import ButtonsPanel from './ButtonsPanel';

const Drawer = ({ isDrawerOpen, setIsDrawerOpen, onLayout, setEdgeType }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      backgroundColor: "#FFFFFF",
      padding: "10px",
      borderRadius: "10px",
      width: "40px",
      boxShadow:'0px 5px 6px rgb(0 0 0 / 0.25)'
    }}
  >
    <button
      onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      {isDrawerOpen ? (
        <img src="/assets/images/reactflow/icons/close.svg" style={{ width: "100%", height: "100%" }} />
      ) : (
        <img src="/assets/images/reactflow/icons/open.svg" style={{ width: "100%", height: "100%" }} />
      )}
    </button>
    {isDrawerOpen && <ButtonsPanel onLayout={onLayout} setEdgeType={setEdgeType} />}
  </div>
);

export default Drawer;
