import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'iam.db');
const db = new Database(dbPath);

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    nombre TEXT,
    apellido TEXT,
    email TEXT,
    telefono TEXT,
    estado TEXT,
    cargo TEXT,
    sistemas TEXT
  );

  CREATE TABLE IF NOT EXISTS audit (
    id TEXT PRIMARY KEY,
    usuario TEXT,
    accion TEXT,
    sistema TEXT,
    detalle TEXT,
    fecha TEXT,
    responsable TEXT
  );

  CREATE TABLE IF NOT EXISTS roles (
    id TEXT PRIMARY KEY,
    nombre TEXT,
    descripcion TEXT,
    sistema TEXT,
    permisos TEXT,
    usuariosAsignados INTEGER
  );
`);

export default db;
