import React, { useState } from 'react';
import { Upload, Download, RefreshCw, ZoomIn, ZoomOut, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import YAMLUploader from '../components/network/YAMLUploader';
import NetworkCanvas from '../components/network/NetworkCanvas';
import ExportControls from '../components/network/ExportControls';
import SampleYAML from '../components/network/SampleYAML';

export default function NetworkDiagrammer() {
  const [networkData, setNetworkData] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [showSample, setShowSample] = useState(false);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleReset = () => setZoom(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Network Diagram Generator
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Visualize your infrastructure from YAML configuration
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSample(!showSample)}
                className="border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400"
              >
                <Upload className="w-4 h-4 mr-2" />
                {showSample ? 'Hide' : 'Show'} Sample
              </Button>
              {networkData && (
                <ExportControls networkData={networkData} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-4 space-y-6">
            <YAMLUploader onDataParsed={setNetworkData} />
            {showSample && <SampleYAML onLoadSample={setNetworkData} />}
            
            {networkData && (
              <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Network Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Components</span>
                    <span className="text-white font-medium">
                      {networkData.components?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Groups</span>
                    <span className="text-white font-medium">
                      {networkData.groups?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Connections</span>
                    <span className="text-white font-medium">
                      {networkData.connections?.length || 0}
                    </span>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Canvas Panel */}
          <div className="lg:col-span-8">
            <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl overflow-hidden">
              {/* Canvas Controls */}
              <div className="border-b border-white/10 bg-slate-950/30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleZoomIn}
                    className="text-white hover:bg-white/10"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleZoomOut}
                    className="text-white hover:bg-white/10"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleReset}
                    className="text-white hover:bg-white/10"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-slate-400 ml-2">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>
              </div>

              {/* Canvas */}
              <div className="relative" style={{ height: '700px' }}>
                {networkData ? (
                  <NetworkCanvas data={networkData} zoom={zoom} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-indigo-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        No Network Loaded
                      </h3>
                      <p className="text-sm text-slate-400">
                        Upload a YAML file or load the sample to get started
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}