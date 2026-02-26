import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  History, 
  Activity, 
  LayoutDashboard,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Settings,
  Menu,
  X,
  User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MOCK_USERS, 
  MOCK_AUDIT, 
  MOCK_INTEGRATIONS, 
  MOCK_ROLES, 
  MOCK_NOTIFICATIONS,
  User, 
  AuditEntry, 
  IntegrationStatus,
  Role,
  Notification
} from './types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab, onLogout, isOpen, onClose }: { activeTab: string, setActiveTab: (tab: string) => void, onLogout: () => void, isOpen: boolean, onClose: () => void }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Consulta de Colaborador', icon: Users },
    { id: 'roles', label: 'Gobierno de Roles', icon: ShieldCheck },
    { id: 'audit', label: 'Auditoría', icon: History },
    { id: 'monitor', label: 'Monitoreo de Integraciones', icon: Activity },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 w-64 bg-white h-screen border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between lg:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tia-red rounded-lg flex items-center justify-center text-white font-bold text-xl">
              T
            </div>
            <div>
              <h1 className="text-tia-red font-bold text-xl tracking-tight">Tía</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">IAM Console</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-tia-red">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 mt-4">
          <p className="px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Menú Principal</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-tia-red/5 text-tia-red border-r-4 border-tia-red font-semibold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div 
            onClick={onLogout}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 cursor-pointer transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
              <UserIcon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-red-600 transition-colors">Fabricio Diaz</p>
              <p className="text-[10px] text-slate-400 truncate">Administrador</p>
            </div>
            <LogOut size={14} className="text-slate-400 group-hover:text-red-600 transition-colors" />
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ title, onMenuClick }: { title: string, onMenuClick: () => void }) => {
  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 text-slate-500 text-sm overflow-hidden whitespace-nowrap">
          <span className="hidden sm:inline">Administrador</span>
          <ChevronRight size={14} className="hidden sm:inline" />
          <span className="text-slate-900 font-medium truncate">{title}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell 
            size={20} 
            className={`cursor-pointer transition-colors ${showNotifications ? 'text-tia-red' : 'text-slate-400 hover:text-tia-red'}`} 
            onClick={() => setShowNotifications(!showNotifications)}
          />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-tia-red text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
            {MOCK_NOTIFICATIONS.filter(n => !n.leida).length}
          </span>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)}></div>
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-80 bg-white rounded-xl border border-slate-200 shadow-2xl z-40 overflow-hidden"
                >
                  <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-800">Notificaciones</h4>
                    <span className="text-[10px] text-tia-red font-bold uppercase tracking-wider">Marcar todas como leídas</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {MOCK_NOTIFICATIONS.map((n) => (
                      <div key={n.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${!n.leida ? 'bg-tia-red/5' : ''}`}>
                        <div className="flex gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                            n.tipo === 'error' ? 'bg-tia-red' : n.tipo === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">{n.titulo}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.mensaje}</p>
                            <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold">{n.fecha}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center bg-slate-50">
                    <button className="text-[11px] font-bold text-slate-500 hover:text-tia-red transition-colors">Ver todas las notificaciones</button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-tia-red/10 text-tia-red flex items-center justify-center font-bold text-xs">
            FD
          </div>
          <span className="text-sm font-medium text-slate-700">Fabricio Diaz</span>
        </div>
      </div>
    </header>
  );
};

const DashboardView = () => {
  const data = [
    { name: 'Lun', exitos: 400, fallos: 24 },
    { name: 'Mar', exitos: 300, fallos: 13 },
    { name: 'Mie', exitos: 200, fallos: 98 },
    { name: 'Jue', exitos: 278, fallos: 39 },
    { name: 'Vie', exitos: 189, fallos: 48 },
    { name: 'Sab', exitos: 239, fallos: 38 },
    { name: 'Dom', exitos: 349, fallos: 43 },
  ];

  const pieData = [
    { name: 'Keycloak', value: 400 },
    { name: 'SGR', value: 300 },
    { name: 'SIM', value: 300 },
    { name: 'AD', value: 200 },
  ];

  const COLORS = ['#E30613', '#F27D26', '#141414', '#8E9299'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Usuarios Totales', value: '1,284', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Integraciones Hoy', value: '4,520', change: '+5%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Fallos Críticos', value: '12', change: '-2', icon: X, color: 'text-tia-red', bg: 'bg-red-50' },
          { label: 'Roles Activos', value: '86', change: '0', icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 card-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-600' : stat.change === '0' ? 'text-slate-400' : 'text-tia-red'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 card-shadow">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Tráfico de Eventos (7 días)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="exitos" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="fallos" fill="#E30613" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 card-shadow">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Distribución por Sistema</h3>
          <div className="h-64 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="w-full h-full max-w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-[10px] sm:text-xs text-slate-600 font-medium whitespace-nowrap">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UsersView = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  
  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 card-shadow overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Gestión de Usuarios</h3>
            <p className="text-sm text-slate-500">Administra los usuarios registrados en el ecosistema Tía.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o email..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tia-red/20 focus:border-tia-red w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-tia-red hover:bg-tia-red-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Users size={16} />
              Crear Usuario
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cargo</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sistemas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_USERS.filter(u => 
                u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                u.email.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                        {user.nombre[0]}{user.apellido[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{user.nombre} {user.apellido}</p>
                        <p className="text-[10px] text-slate-400">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{user.cargo}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.estado === 'Activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {Object.keys(user.sistemas).map(sys => (
                        <span key={sys} className="w-6 h-6 rounded bg-slate-100 text-[8px] flex items-center justify-center font-bold text-slate-500 uppercase">
                          {sys.substring(0, 2)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="p-1.5 text-slate-400 hover:text-tia-red hover:bg-tia-red/5 rounded transition-colors"
                      >
                        <Settings size={16} />
                      </button>
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="p-1.5 text-slate-400 hover:text-tia-red hover:bg-tia-red/5 rounded transition-colors"
                      >
                        <ShieldCheck size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">Mostrando {MOCK_USERS.length} de {MOCK_USERS.length} registros</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded text-xs font-medium text-slate-600 hover:bg-white transition-colors">Anterior</button>
            <button className="px-3 py-1 bg-tia-red text-white rounded text-xs font-medium">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded text-xs font-medium text-slate-600 hover:bg-white transition-colors">Siguiente</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {(showModal || selectedUser) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => { setShowModal(false); setSelectedUser(null); }}
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">
                  {selectedUser ? `Detalles de ${selectedUser.nombre}` : 'Crear Nuevo Colaborador'}
                </h3>
                <button onClick={() => { setShowModal(false); setSelectedUser(null); }} className="text-slate-400 hover:text-tia-red transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {selectedUser ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-16 h-16 rounded-full bg-tia-red/10 text-tia-red flex items-center justify-center font-bold text-xl">
                        {selectedUser.nombre[0]}{selectedUser.apellido[0]}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">{selectedUser.nombre} {selectedUser.apellido}</h4>
                        <p className="text-sm text-slate-500">{selectedUser.cargo}</p>
                        <p className="text-xs text-slate-400">{selectedUser.email}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Roles por Sistema</h5>
                      <div className="grid grid-cols-1 gap-3">
                        {Object.entries(selectedUser.sistemas).map(([sys, roles]) => (
                          <div key={sys} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg">
                            <span className="text-xs font-bold text-slate-700 uppercase">{sys}</span>
                            <div className="flex flex-wrap gap-1 justify-end">
                              {(roles as string[]).map(r => (
                                <span key={r} className="px-2 py-0.5 bg-tia-red/5 text-tia-red text-[10px] font-medium rounded border border-tia-red/10">
                                  {r}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Nombre</label>
                        <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tia-red/20 focus:border-tia-red" placeholder="Ej: Juan" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Apellido</label>
                        <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tia-red/20 focus:border-tia-red" placeholder="Ej: Pérez" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Email Corporativo</label>
                      <input type="email" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tia-red/20 focus:border-tia-red" placeholder="usuario@tia.com.ec" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Cargo / Posición</label>
                      <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tia-red/20 focus:border-tia-red">
                        <option>Analista de Sistemas</option>
                        <option>Gerente de Tienda</option>
                        <option>Supervisor Regional</option>
                        <option>Operador de Bodega</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6 bg-slate-50 flex gap-3 justify-end">
                <button onClick={() => { setShowModal(false); setSelectedUser(null); }} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                  {selectedUser ? 'Cerrar' : 'Cancelar'}
                </button>
                {!selectedUser && (
                  <button 
                    onClick={() => {
                      alert('Usuario creado exitosamente (Simulado)');
                      setShowModal(false);
                    }}
                    className="px-6 py-2 bg-tia-red text-white text-sm font-bold rounded-lg hover:bg-tia-red-hover transition-colors shadow-lg shadow-tia-red/20"
                  >
                    Guardar Usuario
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const RolesView = ({ showToast }: { showToast: (m: string, t: any) => void }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showRoleModal, setShowRoleModal] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);
  const [showMappingModal, setShowMappingModal] = React.useState(false);
  const [viewingUsersForRole, setViewingUsersForRole] = React.useState<Role | null>(null);
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 card-shadow overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Gobierno de Roles</h3>
            <p className="text-sm text-slate-500">Define y gestiona la matriz de accesos por sistema.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar rol o sistema..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tia-red/20 focus:border-tia-red w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowRoleModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} />
              Nuevo Rol
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {MOCK_ROLES.map((role) => (
            <div key={role.id} className="p-6 hover:bg-slate-50 transition-colors group relative">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 bg-tia-red/10 text-tia-red text-[10px] font-bold rounded uppercase tracking-wider">
                  {role.sistema}
                </span>
                <Settings size={14} className="text-slate-300 group-hover:text-slate-500 cursor-pointer" />
              </div>
              <h4 className="text-base font-bold text-slate-800">{role.nombre}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{role.descripcion}</p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Permisos</span>
                  <span>{role.permisos.length}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {role.permisos.map(p => (
                    <span key={p} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] rounded font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div 
                  onClick={() => setViewingUsersForRole(role)}
                  className="flex items-center gap-2 cursor-pointer hover:bg-tia-red/5 px-2 py-1 rounded transition-colors group/users"
                >
                  <Users size={14} className="text-slate-400 group-hover/users:text-tia-red" />
                  <span className="text-xs font-bold text-slate-700 group-hover/users:text-tia-red">{role.usuariosAsignados} usuarios</span>
                </div>
                <button 
                  onClick={() => setSelectedRole(role)}
                  className="text-xs font-bold text-tia-red hover:underline"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 card-shadow text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={32} className="text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Matriz de Cardinalidad</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-2">
          Configura las relaciones 1-1 o 1-N entre cargos corporativos y roles técnicos en Keycloak, SGR y SIM.
        </p>
        <button 
          onClick={() => setShowMappingModal(true)}
          className="mt-6 px-6 py-2 border-2 border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-tia-red hover:text-tia-red transition-all"
        >
          Configurar Mapeos
        </button>
      </div>

      <AnimatePresence>
        {(showRoleModal || selectedRole || showMappingModal || viewingUsersForRole) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => { setShowRoleModal(false); setSelectedRole(null); setShowMappingModal(false); setViewingUsersForRole(null); }}
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">
                  {showRoleModal ? 'Crear Nuevo Rol' : 
                   selectedRole ? `Detalles de Rol: ${selectedRole.nombre}` : 
                   viewingUsersForRole ? `Usuarios con Rol: ${viewingUsersForRole.nombre}` :
                   'Matriz de Cardinalidad'}
                </h3>
                <button onClick={() => { setShowRoleModal(false); setSelectedRole(null); setShowMappingModal(false); setViewingUsersForRole(null); }} className="text-slate-400 hover:text-tia-red transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {showRoleModal ? (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Nombre del Rol</label>
                      <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tia-red/20 focus:border-tia-red" placeholder="Ej: auditor_externo" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Sistema Destino</label>
                      <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tia-red/20 focus:border-tia-red">
                        <option>Keycloak</option>
                        <option>SGR (Retail)</option>
                        <option>SIM (Inventario)</option>
                        <option>Active Directory</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Descripción</label>
                      <textarea className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tia-red/20 focus:border-tia-red h-24" placeholder="Describe las responsabilidades de este rol..."></textarea>
                    </div>
                  </div>
                ) : selectedRole ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Sistema</p>
                        <p className="text-sm font-bold text-slate-800">{selectedRole.sistema}</p>
                      </div>
                      <div 
                        onClick={() => {
                          setViewingUsersForRole(selectedRole);
                          setSelectedRole(null);
                        }}
                        className="p-4 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-tia-red/5 transition-colors group/stat"
                      >
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Usuarios Asignados</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-slate-800 group-hover/stat:text-tia-red">{selectedRole.usuariosAsignados}</p>
                          <ChevronRight size={14} className="text-slate-300 group-hover/stat:text-tia-red" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Permisos Técnicos</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedRole.permisos.map(p => (
                          <div key={p} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
                            <ShieldCheck size={12} className="text-tia-red" />
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : viewingUsersForRole ? (
                  <div className="space-y-4">
                    <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
                      <div className="max-h-96 overflow-y-auto divide-y divide-slate-50">
                        {MOCK_USERS.filter(u => {
                          const sysKey = viewingUsersForRole.sistema.toLowerCase().split(' ')[0];
                          const userRoles = (u.sistemas as any)[sysKey] || [];
                          return userRoles.includes(viewingUsersForRole.nombre);
                        }).map(user => (
                          <div key={user.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                {user.nombre[0]}{user.apellido[0]}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-800">{user.nombre} {user.apellido}</p>
                                <p className="text-xs text-slate-400">{user.cargo} • {user.email}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">Activo</span>
                          </div>
                        ))}
                        {MOCK_USERS.filter(u => {
                          const sysKey = viewingUsersForRole.sistema.toLowerCase().split(' ')[0];
                          const userRoles = (u.sistemas as any)[sysKey] || [];
                          return userRoles.includes(viewingUsersForRole.nombre);
                        }).length === 0 && (
                          <div className="p-12 text-center text-slate-400 text-sm italic">
                            No hay usuarios asignados directamente a este rol técnico.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-500 mb-4">Define la correspondencia entre cargos de nómina y roles en sistemas técnicos.</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase">Cargo Nómina</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase">Sistema</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase">Rol Técnico</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase">Relación</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { cargo: 'Gerente Tienda', sys: 'SGR', rol: 'manager_retail', rel: '1:1' },
                            { cargo: 'Cajero', sys: 'SGR', rol: 'pos_operator', rel: '1:1' },
                            { cargo: 'Analista IT', sys: 'Keycloak', rol: 'it_support', rel: '1:N' },
                          ].map((m, i) => (
                            <tr key={i} className="text-xs">
                              <td className="px-4 py-3 font-semibold text-slate-800">{m.cargo}</td>
                              <td className="px-4 py-3 text-slate-600">{m.sys}</td>
                              <td className="px-4 py-3 text-tia-red font-mono">{m.rol}</td>
                              <td className="px-4 py-3"><span className="px-2 py-0.5 bg-slate-100 rounded font-bold">{m.rel}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6 bg-slate-50 flex gap-3 justify-end">
                <button onClick={() => { setShowRoleModal(false); setSelectedRole(null); setShowMappingModal(false); setViewingUsersForRole(null); }} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                  {viewingUsersForRole ? 'Volver' : 'Cerrar'}
                </button>
                {showRoleModal && (
                  <button 
                    onClick={() => { showToast('Rol creado exitosamente', 'success'); setShowRoleModal(false); }}
                    className="px-6 py-2 bg-tia-red text-white text-sm font-bold rounded-lg hover:bg-tia-red-hover transition-colors"
                  >
                    Guardar Rol
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LoginView = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = React.useState('admin@tia.com.ec');
  const [password, setPassword] = React.useState('********');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="p-8 bg-tia-red text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Tía IAM Console</h2>
            <p className="text-white/70 text-sm mt-1">Gestión Centralizada de Identidades</p>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Corporativo</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-tia-red/20 focus:border-tia-red transition-all" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contraseña</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-tia-red/20 focus:border-tia-red transition-all" 
                />
              </div>
            </div>

            <button 
              onClick={onLogin}
              className="w-full py-4 bg-tia-red text-white font-bold rounded-xl hover:bg-tia-red-hover transition-all shadow-lg shadow-tia-red/20 flex items-center justify-center gap-2 group"
            >
              Ingresar al Sistema
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-center">
              <p className="text-xs text-slate-400">¿Olvidaste tu contraseña? <span className="text-tia-red font-bold cursor-pointer hover:underline">Contactar Soporte IT</span></p>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-400 text-xs font-medium uppercase tracking-widest">
          Seguridad Corporativa Tía
        </p>
      </motion.div>
    </div>
  );
};

const MonitorView = ({ showToast }: { showToast: (m: string, t: any) => void }) => {
  const [reprocessing, setReprocessing] = React.useState<string | null>(null);

  const handleReprocess = (id: string) => {
    setReprocessing(id);
    setTimeout(() => {
      setReprocessing(null);
      showToast('Sincronización re-lanzada con éxito. El bus de eventos está procesando la solicitud.', 'success');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 card-shadow">
          <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity size={16} className="text-tia-red" />
            Estado del Event Bus
          </h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-medium text-slate-600">Operacional</span>
            </div>
            <span className="text-xs text-slate-400">Latencia: 45ms</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 card-shadow">
          <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity size={16} className="text-amber-500" />
            Salud de Colas (SQS)
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">3 Colas con retraso</span>
            <span className="text-xs text-amber-600 font-bold">Atención</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 card-shadow">
          <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity size={16} className="text-blue-500" />
            Lambdas de Procesamiento
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">8/8 Activas</span>
            <span className="text-xs text-emerald-600 font-bold">OK</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 card-shadow overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Sincronización de Sistemas</h3>
          <p className="text-sm text-slate-500">Monitoreo en tiempo real de la propagación de identidades.</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_INTEGRATIONS.map((item) => (
            <div key={item.id} className="border border-slate-100 rounded-xl p-4 hover:border-tia-red/20 transition-colors group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.sistema}</span>
                <span className={`w-2 h-2 rounded-full ${
                  item.estado === 'Exitoso' ? 'bg-emerald-500' : item.estado === 'Fallido' ? 'bg-tia-red' : 'bg-blue-500'
                }`}></span>
              </div>
              <p className={`text-sm font-bold ${item.estado === 'Fallido' ? 'text-tia-red' : 'text-slate-800'}`}>
                {item.estado}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Última: {item.ultimaSincronizacion}</p>
              {item.error && (
                <p className="text-[10px] text-tia-red mt-2 bg-red-50 p-2 rounded border border-red-100 italic">
                  {item.error}
                </p>
              )}
              {item.reprocesable && (
                <button 
                  onClick={() => handleReprocess(item.id)}
                  disabled={reprocessing === item.id}
                  className={`mt-4 w-full py-2 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    reprocessing === item.id ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800'
                  }`}
                >
                  <Activity size={14} className={reprocessing === item.id ? 'animate-spin' : ''} />
                  {reprocessing === item.id ? 'Reprocesando...' : 'Reprocesar Manualmente'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AuditView = ({ showToast }: { showToast: (m: string, t: any) => void }) => {
  const handleExport = () => {
    showToast('Generando reporte de auditoría en formato CSV/PDF... El archivo se descargará automáticamente en unos segundos.', 'info');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 card-shadow overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Registro de Auditoría</h3>
          <p className="text-sm text-slate-500">Trazabilidad completa de cambios en identidades y roles.</p>
        </div>
        <button 
          onClick={handleExport}
          className="text-slate-500 hover:text-tia-red text-sm font-semibold flex items-center justify-center gap-2"
        >
          <History size={16} />
          Exportar Reporte
        </button>
      </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fecha y Hora</th>
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Usuario Afectado</th>
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Acción</th>
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sistema</th>
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Responsable</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {MOCK_AUDIT.map((entry) => (
            <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 text-xs text-slate-500 font-mono">{entry.fecha}</td>
              <td className="px-6 py-4 text-sm font-semibold text-slate-800">{entry.usuario}</td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-700 font-medium">{entry.accion}</span>
                  <span className="text-[10px] text-slate-400 italic">{entry.detalle}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase">
                  {entry.sistema}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">{entry.responsable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

// --- Main App ---

const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'info' | 'error', onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.9 }}
    className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-white/10 min-w-[320px]"
  >
    <div className={`w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-tia-red' : 'bg-blue-500'}`}></div>
    <p className="text-sm font-medium flex-1 leading-tight">{message}</p>
    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
      <X size={16} />
    </button>
  </motion.div>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [toast, setToast] = React.useState<{ message: string, type: 'success' | 'info' | 'error' } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'users': return <UsersView />;
      case 'roles': return <RolesView showToast={showToast} />;
      case 'monitor': return <MonitorView showToast={showToast} />;
      case 'audit': return <AuditView showToast={showToast} />;
      default: return <div className="p-12 text-center text-slate-400">Módulo en desarrollo...</div>;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard General';
      case 'users': return 'Gestión de Usuarios';
      case 'roles': return 'Gobierno de Roles';
      case 'audit': return 'Auditoría de Cambios';
      case 'monitor': return 'Monitoreo de Integraciones';
      default: return 'Tía IAM Console';
    }
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-tia-bg font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={() => setIsAuthenticated(false)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header 
          title={getTitle()} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        
        <div className="p-4 lg:p-8 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {toast && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => setToast(null)} 
            />
          )}
        </AnimatePresence>

        <footer className="p-6 text-center border-t border-slate-200 bg-white">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            © 2026@ Almacenes Tía S.A. - Plataforma de Automatización IAM
          </p>
        </footer>
      </main>
    </div>
  );
}
