import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Download,
  Upload,
  Radio,
  Layers,
  AlertCircle
} from 'lucide-react';
import { Channel, ChannelSource, CategoryInfo } from '../types';

interface ChannelManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  channels: Channel[];
  categories: CategoryInfo[];
  onSaveChannels: (channels: Channel[]) => void;
  onResetToDefaults: () => void;
}

export const ChannelManagerModal: React.FC<ChannelManagerModalProps> = ({
  isOpen,
  onClose,
  channels,
  categories,
  onSaveChannels,
  onResetToDefaults,
}) => {
  const [channelList, setChannelList] = useState<Channel[]>(channels);
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Sync state if modal opens
  React.useEffect(() => {
    setChannelList(channels);
  }, [channels, isOpen]);

  if (!isOpen) return null;

  const showFeedback = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleStartCreate = () => {
    const newChan: Channel = {
      id: `custom-channel-${Date.now()}`,
      title: 'Nuevo Canal Deportivo',
      category: categories[1]?.name || 'La Liga',
      logo: 'https://i.postimg.cc/htMSxGZJ/Deportes-ERB-fondo.png',
      sources: [
        {
          name: 'Servidor Principal',
          url: 'https://',
          type: 'embed',
        },
      ],
    };
    setEditingChannel(newChan);
  };

  const handleSaveEdit = () => {
    if (!editingChannel) return;
    if (!editingChannel.title.trim()) {
      showFeedback('Por favor introduce un nombre válido para el canal.');
      return;
    }

    const existingIndex = channelList.findIndex((c) => c.id === editingChannel.id);
    let updated: Channel[];

    if (existingIndex >= 0) {
      updated = [...channelList];
      updated[existingIndex] = editingChannel;
    } else {
      updated = [editingChannel, ...channelList];
    }

    setChannelList(updated);
    onSaveChannels(updated);
    setEditingChannel(null);
    showFeedback('¡Canal guardado correctamente!');
  };

  const handleDeleteChannel = (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este canal?')) {
      const updated = channelList.filter((c) => c.id !== id);
      setChannelList(updated);
      onSaveChannels(updated);
      if (editingChannel?.id === id) {
        setEditingChannel(null);
      }
      showFeedback('Canal eliminado.');
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= channelList.length) return;

    const copy = [...channelList];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;

    setChannelList(copy);
    onSaveChannels(copy);
  };

  // Sources management inside active edit
  const handleAddSource = () => {
    if (!editingChannel) return;
    const newSource: ChannelSource = {
      name: `Servidor ${editingChannel.sources.length + 1}`,
      url: '',
      type: 'embed',
    };
    setEditingChannel({
      ...editingChannel,
      sources: [...editingChannel.sources, newSource],
    });
  };

  const handleUpdateSource = (
    index: number,
    field: keyof ChannelSource,
    val: string
  ) => {
    if (!editingChannel) return;
    const updatedSources = [...editingChannel.sources];
    updatedSources[index] = {
      ...updatedSources[index],
      [field]: val,
    };
    // Auto-detect m3u8
    if (field === 'url' && val.includes('.m3u8')) {
      updatedSources[index].type = 'm3u8';
    }
    setEditingChannel({
      ...editingChannel,
      sources: updatedSources,
    });
  };

  const handleDeleteSource = (index: number) => {
    if (!editingChannel) return;
    if (editingChannel.sources.length <= 1) {
      showFeedback('El canal debe contener al menos 1 servidor.');
      return;
    }
    const updatedSources = editingChannel.sources.filter((_, i) => i !== index);
    setEditingChannel({
      ...editingChannel,
      sources: updatedSources,
    });
  };

  // Export & Import
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(channelList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `deportes_erb_canales_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showFeedback('Archivo JSON descargado con éxito.');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].title && parsed[0].sources) {
            setChannelList(parsed);
            onSaveChannels(parsed);
            showFeedback(`¡${parsed.length} canales importados exitosamente!`);
          } else {
            showFeedback('El archivo JSON no tiene el formato de canales válido.');
          }
        } catch {
          showFeedback('Error al leer el archivo JSON.');
        }
      };
    }
  };

  const filteredChannels = channelList.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0f1422] border-2 border-[#00e5ff] rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#152033] px-5 py-3.5 border-b border-[#23314d] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Radio className="w-5 h-5 text-[#00e5ff]" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Gestor y Editor de Canales
            </h2>
          </div>
          <button
            id="close-manager-modal-btn"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert */}
        {statusMessage && (
          <div className="bg-[#007bff] text-white px-4 py-2 text-xs sm:text-sm font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Main Content: Split view between List and Active Form */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Channel List & Controls */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00e5ff]" />
                <span>Canales Activos ({channelList.length})</span>
              </div>
              <button
                id="add-new-channel-btn"
                onClick={handleStartCreate}
                className="flex items-center gap-1.5 bg-[#007bff] hover:bg-[#0056b3] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Canal</span>
              </button>
            </div>

            {/* Quick Filter */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar canales en lista..."
              className="w-full px-3 py-1.5 rounded-lg bg-[#161f30] border border-[#2a3a55] text-xs sm:text-sm text-white focus:outline-none focus:border-[#00e5ff]"
            />

            {/* Channels Scroll Box */}
            <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {filteredChannels.map((chan, idx) => (
                <div
                  key={chan.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                    editingChannel?.id === chan.id
                      ? 'bg-[#1e2c47] border-[#00e5ff]'
                      : 'bg-[#141b2a] border-[#222d42] hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <img
                      src={chan.logo}
                      alt={chan.title}
                      className="w-8 h-8 object-contain bg-white rounded p-0.5 shrink-0"
                    />
                    <div className="truncate">
                      <div className="text-xs sm:text-sm font-bold text-white truncate">
                        {chan.title}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {chan.category} • {chan.sources.length} servidores
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                      title="Subir"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === channelList.length - 1}
                      className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                      title="Bajar"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setEditingChannel(chan)}
                      className="p-1.5 bg-[#007bff]/20 hover:bg-[#007bff] text-[#00e5ff] hover:text-white rounded-md transition-colors"
                      title="Editar canal"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteChannel(chan.id)}
                      className="p-1.5 bg-red-500/20 hover:bg-red-600 text-red-400 hover:text-white rounded-md transition-colors"
                      title="Eliminar canal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Global Actions (Import / Export / Reset) */}
            <div className="mt-2 pt-3 border-t border-[#23314d] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-1 bg-[#1a2335] hover:bg-[#25324c] text-gray-300 text-xs px-2.5 py-1.5 rounded-lg border border-[#2d3b57]"
                  title="Descargar configuración de canales"
                >
                  <Download className="w-3 h-3 text-[#00e5ff]" />
                  <span>Exportar JSON</span>
                </button>

                <label className="flex items-center gap-1 bg-[#1a2335] hover:bg-[#25324c] text-gray-300 text-xs px-2.5 py-1.5 rounded-lg border border-[#2d3b57] cursor-pointer">
                  <Upload className="w-3 h-3 text-emerald-400" />
                  <span>Importar JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                onClick={() => {
                  if (window.confirm('¿Deseas restaurar la lista original de canales del archivo de texto?')) {
                    onResetToDefaults();
                    showFeedback('Lista original restaurada con éxito.');
                  }
                }}
                className="flex items-center gap-1 text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-500/10"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restaurar Originales</span>
              </button>
            </div>
          </div>

          {/* Right Column: Edit or Create Form */}
          <div className="lg:col-span-6 bg-[#121927] border border-[#23314d] rounded-xl p-4 sm:p-5 flex flex-col gap-4">
            {editingChannel ? (
              <>
                <div className="flex items-center justify-between border-b border-[#23314d] pb-2">
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <Edit2 className="w-4 h-4 text-[#00e5ff]" />
                    <span>Editando: {editingChannel.title}</span>
                  </h3>
                  <button
                    onClick={() => setEditingChannel(null)}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                </div>

                {/* Form fields */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <label className="block text-gray-400 font-semibold mb-1">
                      Nombre del Canal:
                    </label>
                    <input
                      type="text"
                      value={editingChannel.title}
                      onChange={(e) =>
                        setEditingChannel({
                          ...editingChannel,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[#1a2335] border border-[#2d3b57] text-white focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 font-semibold mb-1">
                        Categoría:
                      </label>
                      <select
                        value={editingChannel.category}
                        onChange={(e) =>
                          setEditingChannel({
                            ...editingChannel,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1a2335] border border-[#2d3b57] text-white focus:outline-none focus:border-[#00e5ff]"
                      >
                        {categories
                          .filter((c) => c.name !== 'Todos')
                          .map((cat) => (
                            <option key={cat.name} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 font-semibold mb-1">
                        URL del Logotipo:
                      </label>
                      <input
                        type="text"
                        value={editingChannel.logo}
                        onChange={(e) =>
                          setEditingChannel({
                            ...editingChannel,
                            logo: e.target.value,
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-[#1a2335] border border-[#2d3b57] text-white focus:outline-none focus:border-[#00e5ff]"
                      />
                    </div>
                  </div>

                  {/* Sources list */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-gray-300 font-bold">
                        Servidores / Streams ({editingChannel.sources.length}):
                      </label>
                      <button
                        onClick={handleAddSource}
                        className="flex items-center gap-1 text-[11px] bg-[#007bff]/30 hover:bg-[#007bff] text-[#00e5ff] hover:text-white px-2 py-1 rounded"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Añadir Servidor</span>
                      </button>
                    </div>

                    <div className="max-h-[190px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                      {editingChannel.sources.map((src, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-[#182236] border border-[#263550] p-2 rounded-lg flex flex-col gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={src.name}
                              placeholder="Nombre servidor (ej: DaddyLive)"
                              onChange={(e) =>
                                handleUpdateSource(sIdx, 'name', e.target.value)
                              }
                              className="flex-1 px-2 py-1 rounded bg-[#101724] border border-[#2e3e5c] text-xs text-white"
                            />
                            <select
                              value={src.type}
                              onChange={(e) =>
                                handleUpdateSource(
                                  sIdx,
                                  'type',
                                  e.target.value as 'embed' | 'm3u8'
                                )
                              }
                              className="px-2 py-1 rounded bg-[#101724] border border-[#2e3e5c] text-xs text-[#00e5ff] font-bold"
                            >
                              <option value="embed">Embed (Iframe)</option>
                              <option value="m3u8">M3U8 Directo</option>
                            </select>
                            <button
                              onClick={() => handleDeleteSource(sIdx)}
                              className="text-red-400 hover:text-red-300 p-1"
                              title="Eliminar este servidor"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <input
                            type="text"
                            value={src.url}
                            placeholder="https://..."
                            onChange={(e) =>
                              handleUpdateSource(sIdx, 'url', e.target.value)
                            }
                            className="w-full px-2 py-1 rounded bg-[#101724] border border-[#2e3e5c] text-xs text-gray-300 font-mono"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save button */}
                  <div className="pt-3">
                    <button
                      id="save-channel-btn"
                      onClick={handleSaveEdit}
                      className="w-full flex items-center justify-center gap-2 bg-[#28a745] hover:bg-[#218838] text-white font-bold py-2 px-4 rounded-xl transition-all shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Canal</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400">
                <Radio className="w-12 h-12 text-[#2a3b5c] mb-3" />
                <h4 className="text-white font-bold text-base mb-1">
                  Selecciona un canal para editar
                </h4>
                <p className="text-xs max-w-sm mb-4">
                  O haz clic en el botón inferior para crear un nuevo canal con sus propios servidores y enlaces.
                </p>
                <button
                  onClick={handleStartCreate}
                  className="flex items-center gap-2 bg-[#007bff] hover:bg-[#0056b3] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Nuevo Canal</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#152033] px-5 py-3 border-t border-[#23314d] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#222d44] hover:bg-[#334366] text-white text-xs sm:text-sm font-semibold px-5 py-2 rounded-xl transition-all"
          >
            Cerrar Gestor
          </button>
        </div>
      </div>
    </div>
  );
};
