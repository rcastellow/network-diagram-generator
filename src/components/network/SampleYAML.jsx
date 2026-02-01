import React from 'react';
import { FileCode, Play, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const sampleNetwork = {
  groups: [
    {
      id: 'vpc-1',
      name: 'Production VPC',
      type: 'vpc',
      x: 50,
      y: 50,
      width: 800,
      height: 550
    },
    {
      id: 'subnet-1',
      name: 'Public Subnet',
      type: 'subnet',
      x: 80,
      y: 100,
      width: 300,
      height: 320
    },
    {
      id: 'subnet-2',
      name: 'Private Subnet',
      type: 'subnet',
      x: 420,
      y: 100,
      width: 400,
      height: 450
    }
  ],
  components: [
    {
      id: 'lb-1',
      name: 'Load Balancer',
      type: 'load_balancer',
      x: 120,
      y: 150,
      ip: '10.0.1.10',
      status: 'active'
    },
    {
      id: 'server-1',
      name: 'Web Server 1',
      type: 'server',
      x: 460,
      y: 150,
      ip: '10.0.2.11',
      status: 'active'
    },
    {
      id: 'server-2',
      name: 'Web Server 2',
      type: 'server',
      x: 460,
      y: 280,
      ip: '10.0.2.12',
      status: 'active'
    },
    {
      id: 'db-1',
      name: 'PostgreSQL',
      type: 'database',
      x: 640,
      y: 215,
      ip: '10.0.2.20',
      status: 'active'
    },
    {
      id: 'fw-1',
      name: 'Firewall',
      type: 'firewall',
      x: 120,
      y: 280,
      status: 'active'
    }
  ],
  connections: [
    { from: 'lb-1', to: 'server-1', label: 'HTTPS' },
    { from: 'lb-1', to: 'server-2', label: 'HTTPS' },
    { from: 'server-1', to: 'db-1', label: 'SQL' },
    { from: 'server-2', to: 'db-1', label: 'SQL' },
    { from: 'fw-1', to: 'lb-1', label: 'Allow 443' }
  ]
};

const yamlExample = `# Network Diagram Configuration
groups:
  - id: vpc-1
    name: Production VPC
    type: vpc
    x: 50
    y: 50
    width: 800
    height: 550
  - id: subnet-1
    name: Public Subnet
    type: subnet
    x: 80
    y: 100
    width: 300
    height: 320

components:
  - id: lb-1
    name: Load Balancer
    type: load_balancer
    x: 120
    y: 150
    ip: 10.0.1.10
    status: active
  - id: server-1
    name: Web Server 1
    type: server
    x: 460
    y: 150
    ip: 10.0.2.11

connections:
  - from: lb-1
    to: server-1
    label: HTTPS`;

export default function SampleYAML({ onLoadSample }) {
  const downloadSampleYAML = () => {
    const blob = new Blob([yamlExample], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'sample-network.yaml';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-indigo-400" />
            Sample Configuration
          </h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={downloadSampleYAML}
              className="border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400"
            >
              <Download className="w-3 h-3 mr-1" />
              Download
            </Button>
            <Button
              size="sm"
              onClick={() => onLoadSample(sampleNetwork)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Play className="w-3 h-3 mr-1" />
              Load
            </Button>
          </div>
        </div>
        
        <pre className="bg-slate-950/50 rounded-lg p-4 overflow-x-auto text-xs text-slate-300 font-mono border border-white/10">
          {yamlExample}
        </pre>

        <div className="mt-4 space-y-2 text-xs">
          <p className="text-slate-400">
            <span className="font-semibold text-white">Supported types:</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-slate-300">• server</div>
            <div className="text-slate-300">• database</div>
            <div className="text-slate-300">• load_balancer</div>
            <div className="text-slate-300">• firewall</div>
            <div className="text-slate-300">• storage</div>
            <div className="text-slate-300">• api_gateway</div>
            <div className="text-slate-300">• router</div>
            <div className="text-slate-300">• monitoring</div>
          </div>
          <p className="text-slate-400 mt-3">
            <span className="font-semibold text-white">Group types:</span> vpc, subnet, security_group, availability_zone
          </p>
        </div>
      </div>
    </Card>
  );
}