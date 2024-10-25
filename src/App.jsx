import React, { useCallback, useLayoutEffect, useState } from "react";
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
  Background 
} from "@xyflow/react";
import ELK from "elkjs/lib/elk.bundled.js";
import CustomNode from "./CustomNodes.jsx"; // Import the custom node component
import Drawer from "./Drawer"; // Import the Drawer component
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control drawer visibility

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
        nodeTypes={nodeTypes} // Pass custom node types here
        draggable={true}
      >
        <Panel position="top-right">
          <Drawer 
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            onLayout={onLayout}
            setEdgeType={setEdgeType}
          />
        </Panel>
        {/* <Background bgColor="#F3F7FA" /> */}
        <Controls />
        <MiniMap style={{ boxShadow: "0px 5px 6px rgb(0 0 0 / 0.25)" }} />
      </ReactFlow>
    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <LayoutFlow />
  </ReactFlowProvider>
);
