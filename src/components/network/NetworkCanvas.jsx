import React, { useRef, useEffect, useState } from 'react';
import GroupContainer from './GroupContainer';
import ComponentNode from './ComponentNode';

export default function NetworkCanvas({ data, zoom }) {
  const canvasRef = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target === canvasRef.current || e.target.closest('.canvas-background')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  if (!data) return null;

  const { groups = [], components = [], connections = [] } = data;

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing canvas-background"
      onMouseDown={handleMouseDown}
      id="network-canvas"
      style={{ backgroundColor: '#0f172a' }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#06B6D4" opacity="0.6" />
          </marker>
        </defs>
        
        {/* Render connections */}
        {connections.map((conn, idx) => {
          const fromComp = components.find(c => c.id === conn.from);
          const toComp = components.find(c => c.id === conn.to);
          
          if (!fromComp || !toComp) return null;
          
          const fromX = (fromComp.x || 100) + 60;
          const fromY = (fromComp.y || 100) + 40;
          const toX = (toComp.x || 200) + 60;
          const toY = (toComp.y || 200) + 40;
          
          return (
            <g key={`connection-${idx}`}>
              <line
                x1={fromX}
                y1={fromY}
                x2={toX}
                y2={toY}
                stroke="#06B6D4"
                strokeWidth="2"
                opacity="0.4"
                markerEnd="url(#arrowhead)"
              />
              {conn.label && (
                <text
                  x={(fromX + toX) / 2}
                  y={(fromY + toY) / 2 - 5}
                  fill="#94A3B8"
                  fontSize="11"
                  textAnchor="middle"
                  className="select-none"
                >
                  {conn.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '2000px',
          height: '2000px'
        }}
      >
        {/* Render groups */}
        {groups.map((group) => (
          <GroupContainer key={group.id} group={group} />
        ))}

        {/* Render components */}
        {components.map((component) => (
          <ComponentNode key={component.id} component={component} />
        ))}
      </div>
    </div>
  );
}