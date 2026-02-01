import React, { useState } from 'react';
import { Download, FileImage, FileJson, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import html2canvas from 'html2canvas';

export default function ExportControls({ networkData }) {
  const [exporting, setExporting] = useState(false);

  const exportAsPNG = async () => {
    setExporting(true);
    try {
      const canvas = document.getElementById('network-canvas');
      if (!canvas) return;

      const screenshot = await html2canvas(canvas, {
        backgroundColor: '#0f172a',
        scale: 2,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `network-diagram-${Date.now()}.png`;
      link.href = screenshot.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  const exportAsJSON = () => {
    const jsonStr = JSON.stringify(networkData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `network-config-${Date.now()}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={exporting}
        >
          {exporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-900 border-white/10">
        <DropdownMenuItem
          onClick={exportAsPNG}
          className="text-white hover:bg-white/10 cursor-pointer"
        >
          <FileImage className="w-4 h-4 mr-2" />
          Export as PNG
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={exportAsJSON}
          className="text-white hover:bg-white/10 cursor-pointer"
        >
          <FileJson className="w-4 h-4 mr-2" />
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}