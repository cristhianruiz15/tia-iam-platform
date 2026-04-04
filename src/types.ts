
export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado: 'Activo' | 'Inactivo';
  cargo: string;
  sistemas: {
    keycloak: string[];
    sgr: string[];
    sim: string[];
  };
}

export interface AuditEntry {
  id: string;
  usuario: string;
  accion: string;
  sistema: string;
  detalle: string;
  fecha: string;
  responsable: string;
}

export interface IntegrationStatus {
  id: string;
  sistema: string;
  estado: 'Exitoso' | 'Fallido' | 'Procesando';
  ultimaSincronizacion: string;
  error?: string;
  reprocesable: boolean;
}

export const MOCK_USERS: User[] = [
  {
    id: '1',
    nombre: 'Emma',
    apellido: 'Emma Hernández',
    email: 'emma.hernández@tia.com.ec',
    telefono: '+593 98 765 4321',
    estado: 'Activo',
    cargo: 'Administrador IT',
    sistemas: {
      keycloak: ['admin', 'user_management'],
      sgr: ['supervisor_retail'],
      sim: ['inventory_manager']
    }
  },
  {
    id: '2',
    nombre: 'Jose',
    apellido: 'Yandun',
    email: 'jose.yandun@tia.com.ec',
    telefono: '+0988555256',
    estado: 'Activo',
    cargo: 'Analista de Sistemas',
    sistemas: {
      keycloak: ['viewer'],
      sgr: ['operator'],
      sim: ['viewer']
    }
  },
  {
    id: '3',
    nombre: 'William',
    apellido: 'Cardenas',
    email: 'william.cardenas@tia.com.ec',
    telefono: '+593 99 123 4567',
    estado: 'Activo',
    cargo: 'Gerente Regional',
    sistemas: {
      keycloak: ['regional_admin'],
      sgr: ['manager'],
      sim: ['full_access']
    }
  },
  {
    id: '4',
    nombre: 'Xavier',
    apellido: 'Siavichay',
    email: 'xavier.siavichay@tia.com.ec',
    telefono: '+0939243551',
    estado: 'Activo',
    cargo: 'Soporte Técnico',
    sistemas: {
      keycloak: ['support'],
      sgr: ['viewer'],
      sim: ['support_level_1']
    }
  }
];

export const MOCK_AUDIT: AuditEntry[] = [
  {
    id: 'a1',
    usuario: 'Emma Hernández',
    accion: 'Asignación de Rol',
    sistema: 'Keycloak',
    detalle: 'Se agregó el rol "admin" al usuario Emma Hernández',
    fecha: '2024-05-20 14:30:22',
    responsable: 'Sistema (Auto)'
  },
  {
    id: 'a2',
    usuario: 'Jose Yandun',
    accion: 'Creación de Usuario',
    sistema: 'SIM',
    detalle: 'Usuario creado exitosamente vía Event Bus',
    fecha: '2024-05-20 15:10:05',
    responsable: 'Admin Console'
  },
  {
    id: 'a3',
    usuario: 'Xavier Siavichay',
    accion: 'Reproceso Manual',
    sistema: 'SGR',
    detalle: 'Reproceso de integración fallida por timeout',
    fecha: '2024-05-21 09:45:12',
    responsable: 'Emma Hernández'
  }
];

export const MOCK_INTEGRATIONS: IntegrationStatus[] = [
  {
    id: 'i1',
    sistema: 'Keycloak',
    estado: 'Exitoso',
    ultimaSincronizacion: 'Hace 5 minutos',
    reprocesable: false
  },
  {
    id: 'i2',
    sistema: 'SGR (Retail)',
    estado: 'Fallido',
    ultimaSincronizacion: 'Hace 1 hora',
    error: 'Error de conexión con base de datos SGR',
    reprocesable: true
  },
  {
    id: 'i3',
    sistema: 'SIM (Inventario)',
    estado: 'Exitoso',
    ultimaSincronizacion: 'Hace 12 minutos',
    reprocesable: false
  },
  {
    id: 'i4',
    sistema: 'Active Directory',
    estado: 'Procesando',
    ultimaSincronizacion: 'En curso...',
    reprocesable: false
  }
];

export interface Role {
  id: string;
  nombre: string;
  descripcion: string;
  sistema: string;
  permisos: string[];
  usuariosAsignados: number;
}

export const MOCK_ROLES: Role[] = [
  {
    id: 'r1',
    nombre: 'admin',
    descripcion: 'Acceso total al sistema',
    sistema: 'Keycloak',
    permisos: ['read', 'write', 'delete', 'admin'],
    usuariosAsignados: 5
  },
  {
    id: 'r2',
    nombre: 'supervisor_retail',
    descripcion: 'Supervisión de operaciones en tienda',
    sistema: 'SGR',
    permisos: ['read', 'approve_transfers'],
    usuariosAsignados: 12
  },
  {
    id: 'r3',
    nombre: 'inventory_manager',
    descripcion: 'Gestión de inventarios y bodegas',
    sistema: 'SIM',
    permisos: ['read', 'update_stock'],
    usuariosAsignados: 8
  }
];

export interface Notification {
  id: string;
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
  tipo: 'info' | 'error' | 'success';
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    titulo: 'Fallo en SGR',
    mensaje: 'La integración con SGR ha fallado para 3 usuarios.',
    fecha: 'Hace 10 min',
    leida: false,
    tipo: 'error'
  },
  {
    id: 'n2',
    titulo: 'Nuevo Rol Creado',
    mensaje: 'Se ha creado el rol "Auditor Externo" en Keycloak.',
    fecha: 'Hace 1 hora',
    leida: false,
    tipo: 'info'
  },
  {
    id: 'n3',
    titulo: 'Sincronización Exitosa',
    mensaje: 'Sincronización con Active Directory completada.',
    fecha: 'Hace 3 horas',
    leida: true,
    tipo: 'success'
  }
];

export interface Trace {
  trace_id: string;
  source_system: string;
  source_event_id: string;
  event_type: string;
  event_version: string;
  employee_id: string;
  username: string | null;
  store_id: string;
  received_at: string;
  last_updated_at: string;
  overall_status: string;
  completed_at: string | null;
  reprocess_count: number;
  expected_targets: string[];
  completed_targets: string[];
  failed_targets: string[];
  pending_targets: string[];
}

export interface TraceHeader extends Trace {
  version: number;
  ttl: number | null;
}

export interface TraceSummary {
  attempt_groups_count: number;
  max_attempt: string;
  retry_count: string;
  manual_reprocess_count: string;
  has_failures: boolean;
  failed_systems: string[];
  last_failed_system: string;
  last_error_code: string;
  last_error_type: string;
}

export interface TraceItem {
  entity_type: string;
  pk: string;
  sk: string;
  timestamp: string;
  priority: number;
  attempt_id: string | null;
  data: any;
}

export interface AttemptGroup {
  attempt_id: string;
  system: string;
  attempt: string;
  started_at: string;
  ended_at: string;
  final_step_status: string;
  items: TraceItem[];
}

export interface TraceDetail {
  trace_id: string;
  header: TraceHeader;
  summary: TraceSummary;
  attempt_groups: AttemptGroup[];
  ungrouped_items: any[];
  raw_count: number;
}

export interface TraceRawResponse {
  trace_id: string;
  count: number;
  items: TraceItem[];
}

export interface TracesResponse {
  items: Trace[];
  next_token: string | null;
  count: number;
}
