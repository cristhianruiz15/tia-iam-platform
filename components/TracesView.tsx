'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Terminal,
  Eye,
  FileCode,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  ExternalLink,
  Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Trace, TraceDetail, TraceRawResponse, TraceItem } from '@/src/types';

export const TracesView = () => {
  const [traces, setTraces] = useState<Trace[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('IN_PROGRESS');
  const [selectedTrace, setSelectedTrace] = useState<TraceDetail | null>(null);
  const [rawTrace, setRawTrace] = useState<TraceRawResponse | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const [lambdaNameForLogs, setLambdaNameForLogs] = useState('useast1-lambda-keycloak-sync-avt');
  const [activeTab, setActiveTab] = useState<'details' | 'raw' | 'logs'>('details');

  const fetchTraces = async (status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/traces?overall_status=${status}`);
      const data = await res.json();
      setTraces(data.items || []);
    } catch (error) {
      console.error('Error fetching traces:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTraceDetail = async (id: string) => {
    try {
      const res = await fetch(`/api/traces/${id}`);
      const data = await res.json();
      setSelectedTrace(data);
      setActiveTab('details');
    } catch (error) {
      console.error('Error fetching trace detail:', error);
    }
  };

  const fetchTraceRaw = async (id: string) => {
    try {
      const res = await fetch(`/api/traces/${id}/raw`);
      const data = await res.json();
      setRawTrace(data);
    } catch (error) {
      console.error('Error fetching trace raw:', error);
    }
  };

  useEffect(() => {
    fetchTraces(filter);
  }, [filter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RECEIVED': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'IN_PROGRESS': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'COMPLETED': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'PARTIAL_SUCCESS': return 'text-indigo-600 bg-indigo-50 border-indigo-100';
      case 'FAILED': return 'text-tia-red bg-red-50 border-red-100';
      case 'REPROCESSING': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'CANCELLED': return 'text-slate-600 bg-slate-50 border-slate-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  // Mock CloudWatch Logs Section
  const CloudWatchLogsExample = ({ lambdaName }: { lambdaName: string }) => {
    const mockLogs = [
      { timestamp: '2026-03-31T17:55:46.023Z', message: `INIT RequestId: b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5 Version: $LATEST` },
      { timestamp: '2026-03-31T17:55:46.100Z', message: `[INFO] Processing event for employee 2450758333` },
      { timestamp: '2026-03-31T17:55:46.450Z', message: `[DEBUG] Checking existence in Active Directory...` },
      { timestamp: '2026-03-31T17:55:46.690Z', message: `[ERROR] User 2450758333 already exists in Active Directory` },
      { timestamp: '2026-03-31T17:55:46.695Z', message: `REPORT RequestId: b409d8cc-963e-4c4f-8a0b-59cfbd89a4b5 Duration: 672.31 ms Billed Duration: 673 ms Memory Size: 128 MB Max Memory Used: 64 MB` },
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-slate-900 text-slate-300 p-3 rounded-t-lg border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-emerald-400" />
            <span className="text-xs font-mono font-bold">CloudWatch Logs: {lambdaName}</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase font-bold">
            <span className="flex items-center gap-1"><Clock size={10} /> Last 5 minutes</span>
            <span className="text-emerald-400">Live Streaming</span>
          </div>
        </div>
        <div className="bg-slate-950 p-4 rounded-b-lg font-mono text-xs overflow-x-auto max-h-[400px] custom-scrollbar">
          {mockLogs.map((log, i) => (
            <div key={i} className="flex gap-4 py-1 group hover:bg-white/5 transition-colors">
              <span className="text-slate-500 shrink-0 select-none">{log.timestamp}</span>
              <span className={`${log.message.includes('[ERROR]') ? 'text-red-400' : log.message.includes('[INFO]') ? 'text-blue-300' : 'text-slate-300'}`}>
                {log.message}
              </span>
            </div>
          ))}
          {/*<div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded text-blue-300 text-[10px]">
             <p className="font-bold flex items-center gap-2">
               <AlertCircle size={12} />
               AWS SDK Implementation Tip:
             </p>
             <p className="mt-1 opacity-80">
               Use CloudWatchLogsClient from @aws-sdk/client-cloudwatch-logs. 
               Filter by LogGroup: /aws/lambda/{lambdaName} and use FilterLogEventsCommand for searching logs across streams.
             </p>
          </div>*/}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 card-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Trazabilidad de Eventos</h3>
          <p className="text-sm text-slate-500">Monitoreo detallado de eventos de IAM en tiempo real.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <select
              className="pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-tia-red/20 focus:border-tia-red appearance-none w-full"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="RECEIVED">Recibidos</option>
              <option value="IN_PROGRESS">En Progreso</option>
              <option value="COMPLETED">Completados</option>
              <option value="PARTIAL_SUCCESS">Éxito Parcial</option>
              <option value="FAILED">Fallidos</option>
              <option value="REPROCESSING">Reprocesando</option>
              <option value="CANCELLED">Cancelados</option>
            </select>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={16} />
          </div>
          <button
            onClick={() => fetchTraces(filter)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-tia-red hover:border-tia-red transition-all"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List Column */}
        <div className="lg:col-span-1 space-y-4">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Resultados ({traces.length})</h4>
          <div className="space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-xl border border-slate-200"></div>
              ))
            ) : (
              traces.map(trace => (
                <motion.div
                  key={trace.trace_id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    fetchTraceDetail(trace.trace_id);
                    fetchTraceRaw(trace.trace_id);
                  }}
                  className={`p-4 bg-white rounded-xl border-2 cursor-pointer transition-all ${selectedTrace?.trace_id === trace.trace_id ? 'border-tia-red shadow-lg shadow-tia-red/5' : 'border-slate-200 hover:border-tia-red/30'
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase ${getStatusColor(trace.overall_status)}`}>
                      {trace.overall_status}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 font-mono">{trace.trace_id.substring(0, 8)}</span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-800 truncate mb-1">{trace.event_type}</h5>
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                      <Search size={10} /> ID: {trace.employee_id}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                      <Clock size={10} /> {new Date(trace.last_updated_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-3 flex gap-1">
                    {trace.expected_targets.map(target => (
                      <span key={target} className={`w-1.5 h-1.5 rounded-full ${trace.completed_targets.includes(target) ? 'bg-emerald-500' :
                          trace.failed_targets.includes(target) ? 'bg-tia-red' : 'bg-slate-200'
                        }`} title={target}></span>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Detail Column */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedTrace ? (
              <motion.div
                key={selectedTrace.trace_id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl border border-slate-200 card-shadow overflow-hidden flex flex-col h-full min-h-[600px]"
              >
                {/* Detail Tabs */}
                <div className="flex border-b border-slate-100 bg-slate-50/50">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'details' ? 'border-tia-red text-tia-red bg-white' : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                  >
                    <FileCode size={14} /> Detalles
                  </button>
                  <button
                    onClick={() => setActiveTab('raw')}
                    className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'raw' ? 'border-tia-red text-tia-red bg-white' : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                  >
                    <Code size={14} /> JSON Raw
                  </button>
                  <button
                    onClick={() => setActiveTab('logs')}
                    className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'logs' ? 'border-tia-red text-tia-red bg-white' : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                  >
                    <Terminal size={14} /> CloudWatch Logs
                  </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                  {activeTab === 'details' && (
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Trace ID</p>
                          <p className="text-sm font-mono font-bold text-slate-700">{selectedTrace.trace_id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estado General</p>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${getStatusColor(selectedTrace.header.overall_status)}`}>
                            {selectedTrace.header.overall_status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Información del Evento</h6>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-slate-50">
                              <span className="text-slate-500">Sistema Origen</span>
                              <span className="font-bold text-slate-800">{selectedTrace.header.source_system}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-50">
                              <span className="text-slate-500">Tipo de Evento</span>
                              <span className="font-bold text-slate-800">{selectedTrace.header.event_type}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-50">
                              <span className="text-slate-500">Colaborador ID</span>
                              <span className="font-bold text-slate-800">{selectedTrace.header.employee_id}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-50">
                              <span className="text-slate-500">Usuario</span>
                              <span className="font-bold text-slate-800">{selectedTrace.header.username || '-'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resumen de Procesamiento</h6>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                              <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Intentos</p>
                              <p className="text-lg font-bold text-slate-800">{selectedTrace.summary.attempt_groups_count}</p>
                            </div>
                            <div className={`p-3 rounded-lg border ${selectedTrace.summary.has_failures ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
                              <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Fallos</p>
                              <p className={`text-lg font-bold ${selectedTrace.summary.has_failures ? 'text-tia-red' : 'text-emerald-600'}`}>
                                {selectedTrace.summary.has_failures ? 'SI' : 'NO'}
                              </p>
                            </div>
                          </div>
                          {selectedTrace.summary.has_failures && (
                            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                              <p className="text-[9px] text-tia-red font-bold uppercase mb-1">Último Error</p>
                              <p className="text-xs font-bold text-slate-800">{selectedTrace.summary.last_error_code}: {selectedTrace.summary.last_error_type}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timeline de Intentos</h6>
                        {selectedTrace.attempt_groups.map((group, i) => (
                          <div key={i} className="relative pl-6 border-l-2 border-slate-100 space-y-4 pb-4">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
                              <div className={`w-1.5 h-1.5 rounded-full ${group.final_step_status === 'SUCCESS' ? 'bg-emerald-500' : 'bg-tia-red'}`}></div>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-bold text-slate-800">{group.system} - Intento {group.attempt}</p>
                              <span className="text-[10px] text-slate-400">{new Date(group.started_at).toLocaleTimeString()}</span>
                            </div>
                            <div className="space-y-2">
                              {group.items.map((item, j) => (
                                <div key={j} className="p-3 bg-slate-50/50 rounded-lg border border-slate-100 text-[11px]">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-slate-600 uppercase">{item.entity_type}</span>
                                    <span className="text-slate-400">{new Date(item.timestamp).toLocaleTimeString()}</span>
                                  </div>
                                  {item.entity_type === 'STEP' && (
                                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                                      <p><span className="text-slate-400">Status:</span> <span className={item.data.step_status === 'SUCCESS' ? 'text-emerald-600 font-bold' : 'text-tia-red font-bold'}>{item.data.step_status}</span></p>
                                      <p><span className="text-slate-400">Duration:</span> {item.data.duration_ms}ms</p>
                                      <p className="col-span-2 flex items-center gap-1">
                                        <Terminal size={10} className="text-slate-400" />
                                        <button
                                          onClick={() => {
                                            setLambdaNameForLogs(item.data.lambda_name);
                                            setActiveTab('logs');
                                          }}
                                          className="text-blue-500 hover:underline"
                                        >
                                          {item.data.lambda_name}
                                        </button>
                                      </p>
                                    </div>
                                  )}
                                  {item.entity_type === 'ERROR' && (
                                    <p className="text-tia-red font-medium">{item.data.error_message_summary}</p>
                                  )}
                                  {item.entity_type === 'TIMELINE' && (
                                    <p className="text-slate-600">{item.data.description}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'raw' && (
                    <div className="bg-slate-900 p-4 rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto whitespace-pre h-[calc(100vh-450px)] custom-scrollbar">
                      {JSON.stringify(rawTrace, null, 4)}
                    </div>
                  )}

                  {activeTab === 'logs' && (
                    <CloudWatchLogsExample lambdaName={lambdaNameForLogs} />
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 h-full min-h-[600px] flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Terminal size={32} className="text-slate-300" />
                </div>
                <h4 className="text-lg font-bold text-slate-800">Selecciona un evento</h4>
                <p className="text-sm text-slate-500 max-w-xs mt-2">
                  Haz clic en cualquiera de los eventos de la izquierda para ver su trazabilidad detallada y logs de ejecución.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
