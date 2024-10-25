import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, markerEnd, sourceColor, targetColor }) => {
  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    // Add some curvature to the path
    curvature: 1,
  });

  const gradientId = `gradient-${id}`;

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: sourceColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: targetColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        id={id}
        style={{ stroke: `url(#${gradientId})`, strokeWidth: 2, fill: 'none' }}
        d={path}
        markerEnd={markerEnd}
      />
    </>
  );
};

export default CustomEdge;
