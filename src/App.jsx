import React, { useCallback, useLayoutEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Controls,
  MiniMap,
  Background,
} from "@xyflow/react";
import ELK from "elkjs/lib/elk.bundled.js";
import DownloadButton from "./DownloadButton"; // Import the DownloadButton
import CustomNode from "./CustomNodes.jsx"; // Import the custom node component
import "@xyflow/react/dist/style.css";
import { initialNodes, initialEdges } from "./nodes-edges.js";

const elk = new ELK();
const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeNode": "50000", // Adjust the spacing between nodes
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "150",
};

const getLayoutedElements = (nodes, edges, options = {}) => {
  const isHorizontal = options?.["elk.direction"] === "RIGHT";
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      width: 50,
      height: 30,
    })),
    edges: edges,
  };
  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        position: { x: node.x, y: node.y },
      })),
      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

function LayoutFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();
  const [isHorizontal, setIsHorizontal] = useState(false); // Track layout direction
  const [edgeType, setEdgeType] = useState("smoothstep"); // Track current edge type
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // State to control drawer visibility

  const onConnect = useCallback(
    (params) => {
      const newEdge = { ...params, type: edgeType }; // Use the current edge type
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [edgeType] // Add edgeType to the dependency array
  );

  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { "elk.direction": direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;
      // Update the isHorizontal state based on layout direction
      setIsHorizontal(direction === "RIGHT");
      getLayoutedElements(ns, es, opts).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);
          window.requestAnimationFrame(() => fitView());
        }
      );
    },
    [nodes, edges]
  );

  useLayoutEffect(() => {
    onLayout({ direction: "DOWN", useInitialNodes: true });
  }, []);

  // Update edges when edge type changes
  React.useEffect(() => {
    const updatedEdges = edges.map((edge) => ({ ...edge, type: edgeType }));
    setEdges(updatedEdges);
  }, [edgeType]);

  // Define the custom node types
  const nodeTypes = {
    custom: (props) => <CustomNode {...props} isHorizontal={isHorizontal} />, // Pass the layout direction to the custom node
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
        draggable={true}
      >
        <Panel position="top-right" style={{}}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              backgroundColor: "white",
              padding: "10px",
              border: '2px solid gray',
              borderRadius: '10px'
            }}
          >
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isDrawerOpen ? (
                <Icon
                  icon="solar:alt-arrow-up-line-duotone"
                  width="24px"
                  height="24px"
                />
              ) : (
                <Icon
                  icon="ic:round-control-camera"
                  width="24px"
                  height="24px"
                />
              )}
            </button>
            {isDrawerOpen && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <button
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => onLayout({ direction: "DOWN" })}
                >
                  <img
                    src="/assets/images/reactflow/icons/vertical.svg"
                    style={{ width: "100%", height: "100%" }}
                  />
                </button>
                <button
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => onLayout({ direction: "RIGHT" })}
                >
                  <img
                    src="/assets/images/reactflow/icons/horizontal.svg"
                    style={{ width: "100%", height: "100%" }}
                  />
                </button>
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#D3D3D3", // Light gray color
                    margin: "5px 0",
                  }}
                />
                <button
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setEdgeType("straight")}
                >
                  <img
                    src="/assets/images/reactflow/icons/straight.svg"
                    style={{ width: "100%", height: "100%" }}
                  />
                </button>
                <button
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setEdgeType("step")}
                >
                  <img
                    src="/assets/images/reactflow/icons/steps.svg"
                    style={{ width: "100%", height: "100%" }}
                  />
                </button>
                <button
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setEdgeType("smoothstep")}
                >
                  <img
                    src="/assets/images/reactflow/icons/smoothsteps.svg"
                    style={{ width: "100%", height: "100%" }}
                  />
                </button>
                <button
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setEdgeType("bezier")}
                >
                  <img
                    src="/assets/images/reactflow/icons/bezier.svg"
                    style={{ width: "100%", height: "100%" }}
                  />
                </button>
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#D3D3D3", // Light gray color
                    margin: "5px 0",
                  }}
                />
                <DownloadButton />
              </div>
            )}
          </div>
        </Panel>
        <Background bgColor="#F3F7FA" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <LayoutFlow />
  </ReactFlowProvider>
);