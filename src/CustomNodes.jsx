import React from "react";
import { Handle } from "@xyflow/react"; // Import Handle from ReactFlow

// Custom Node component
const CustomNode = ({ data, isHorizontal }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: isHorizontal ? "column" : "row",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
        <img
          src={data.icon}
          alt={data.label}
          style={{
            width: 60,
            height: 60,
            filter: "drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.25))",
          }}
        />
        
        {/* Source Handle */}
        <Handle
          type="source"
          position={isHorizontal ? "right" : "bottom"}
          style={{
            background: "transparent",
            top: isHorizontal ? "50%" : "90%",
            left: isHorizontal ? "90%" : "50%",
            transform: isHorizontal ? "translateY(-50%)" : "translateX(-50%)",
            border: "none",
          }}
        />
        
        {/* Target Handle */}
        <Handle
          type="target"
          position={isHorizontal ? "left" : "top"}
          style={{
            background: "transparent",
            top: isHorizontal ? "50%" : 0,
            left: isHorizontal ? 0 : "50%",
            transform: isHorizontal ? "translateY(-50%)" : "translateX(-50%)",
            border: "none",
          }}
        />
      </div>

      {/* Label and Subtext */}
      <div
        style={{
          position: "relative",
          textWrap: "nowrap",
          marginTop: isHorizontal ? 10 : 0,
          textAlign: isHorizontal ? "center" : "left",
          marginLeft: isHorizontal ? 0 : "10px",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontFamily: "Public Sans",
            fontSize: 16,
            color: "#1C252E",
          }}
        >
          {data.label}
        </div>
        <div
          style={{
            fontFamily: "Public Sans",
            fontSize: 14,
            color: "#556370",
          }}
        >
          {data.subtext}
        </div>
      </div>
    </div>
  );
};

export default CustomNode;
