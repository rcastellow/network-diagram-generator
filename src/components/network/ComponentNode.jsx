import React from 'react';
import { Server, Database, Shield, Globe, HardDrive, Cloud, Router, Activity } from 'lucide-react';

const iconMap = {
  server: Server,
  database: Database,
  firewall: Shield,
  load_balancer: Globe,
  storage: HardDrive,
  api_gateway: Cloud,
  router: Router,
  monitoring: Activity,
};

const colorMap = {
  server: { bg: 'rgba(99, 102, 241, 0.15)', border: '#6366F1', icon: '#818CF8' },
  database: { bg: 'rgba(16, 185, 129, 0.15)', border: '#10B981', icon: '#34D399' },
  firewall: { bg: 'rgba(239, 68, 68, 0.15)', border: '#EF4444', icon: '#F87171' },
  load_balancer: { bg: 'rgba(6, 182, 212, 0.15)', border: '#06B6D4', icon: '#22D3EE' },
  storage: { bg: 'rgba(245, 158, 11, 0.15)', border: '#F59E0B', icon: '#FBB051' },
  api_gateway: { bg: 'rgba(139, 92, 246, 0.15)', border: '#8B5CF6', icon: '#A78BFA' },
  router: { bg: 'rgba(236, 72, 153, 0.15)', border: '#EC4899', icon: '#F472B6' },
  monitoring: { bg: 'rgba(20, 184, 166, 0.15)', border: '#14B8A6', icon: '#2DD4BF' },
};

export default function ComponentNode({ component }) {
  const { id, name, type = 'server', x = 100, y = 100, ip, status } = component;
  
  const Icon = iconMap[type] || Server;
  const colors = colorMap[type] || colorMap.server;

  return (
    <div
      className="absolute group cursor-move transition-all hover:scale-105"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: '120px'
      }}
    >
      <div
        className="rounded-lg border-2 p-3 backdrop-blur-sm shadow-lg"
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${colors.border}20` }}
          >
            <Icon className="w-4 h-4" style={{ color: colors.icon }} />
          </div>
          {status && (
            <div className={`w-2 h-2 rounded-full ml-auto ${
              status === 'active' ? 'bg-emerald-400' : 'bg-slate-400'
            }`} />
          )}
        </div>
        <p className="text-white text-xs font-semibold mb-1 truncate">
          {name}
        </p>
        <p className="text-slate-400 text-[10px] uppercase tracking-wide mb-1">
          {type.replace(/_/g, ' ')}
        </p>
        {ip && (
          <p className="text-cyan-400 text-[10px] font-mono">
            {ip}
          </p>
        )}
      </div>
    </div>
  );
}