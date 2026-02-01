import React, { useState } from 'react';
import { Upload, FileCode, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import yaml from 'js-yaml';

export default function YAMLUploader({ onDataParsed }) {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState(null);
  const [fileName, setFileName] = useState('');

  const parseYAML = (content) => {
    try {
      const parsed = yaml.load(content);
      setStatus({ type: 'success', message: 'YAML parsed successfully' });
      onDataParsed(parsed);
      return true;
    } catch (error) {
      setStatus({ type: 'error', message: `Parse error: ${error.message}` });
      return false;
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    
    setFileName(file.name);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      parseYAML(e.target.result);
    };
    
    reader.onerror = () => {
      setStatus({ type: 'error', message: 'Failed to read file' });
    };
    
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.yaml') || file.name.endsWith('.yml'))) {
      handleFile(file);
    } else {
      setStatus({ type: 'error', message: 'Please upload a YAML file' });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  return (
    <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FileCode className="w-5 h-5 text-indigo-400" />
          Upload Network Configuration
        </h3>
        
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
            ${isDragging 
              ? 'border-indigo-500 bg-indigo-500/10' 
              : 'border-white/20 hover:border-indigo-500/50 hover:bg-white/5'
            }
          `}
        >
          <input
            type="file"
            accept=".yaml,.yml"
            onChange={handleFileInput}
            className="hidden"
            id="yaml-upload"
          />
          <label htmlFor="yaml-upload" className="cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6 text-indigo-400" />
            </div>
            <p className="text-white font-medium mb-1">
              Drop your YAML file here
            </p>
            <p className="text-sm text-slate-400 mb-3">
              or click to browse
            </p>
            <Button
              variant="outline"
              size="sm"
              className="border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400"
              type="button"
            >
              Choose File
            </Button>
          </label>
        </div>

        {status && (
          <div className={`
            mt-4 p-3 rounded-lg flex items-start gap-3
            ${status.type === 'success' 
              ? 'bg-emerald-500/10 border border-emerald-500/20' 
              : 'bg-red-500/10 border border-red-500/20'
            }
          `}>
            {status.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              {fileName && (
                <p className="text-sm font-medium text-white mb-1">
                  {fileName}
                </p>
              )}
              <p className={`text-sm ${
                status.type === 'success' ? 'text-emerald-300' : 'text-red-300'
              }`}>
                {status.message}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}