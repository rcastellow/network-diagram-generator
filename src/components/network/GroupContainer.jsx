import React from 'react';

export default function GroupContainer({ group }) {
  const { id, name, type = 'vpc', x = 50, y = 50, width = 400, height = 300, color } = group;

  const colorMap = {
    vpc: { bg: 'rgba(99, 102, 241, 0.1)', border: 'rgba(99, 102, 241, 0.4)', label: '#818CF8' },
    subnet: { bg: 'rgba(6, 182, 212, 0.08)', border: 'rgba(6, 182, 212, 0.3)', label: '#22D3EE' },
    security_group: { bg: 'rgba(139, 92, 246, 0.08)', border: 'rgba(139, 92, 246, 0.3)', label: '#A78BFA' },
    availability_zone: { bg: 'rgba(16, 185, 129, 0.08)', border: 'rgba(16, 185, 129, 0.3)', label: '#34D399' },
  };

  const colors = color ? { 
    bg: color.bg || colorMap.vpc.bg, 
    border: color.border || colorMap.vpc.border,
    label: color.label || colorMap.vpc.label
  } : (colorMap[type] || colorMap.vpc);

  return (
    <div
      className="absolute rounded-xl border-2 pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderStyle: 'dashed'
      }}
    >
      <div
        className="absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
          border: '1px solid',
          color: colors.label
        }}
      >
        {name}
      </div>
      <div
        className="absolute bottom-2 right-3 px-2 py-0.5 rounded text-xs font-medium opacity-50"
        style={{ color: colors.label }}
      >
        {type.toUpperCase()}
      </div>
    </div>
  );
}