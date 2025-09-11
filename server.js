import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

import logger from './src/utils/logger.js';
import { connectToDatabase } from './src/config/database.js';
import userRoutes from './src/routes/userRoutes.js';
import missionRoutes from './src/routes/missionRoutes.js';
import { errorHandler, notFoundHandler } from './src/utils/errorHandlers.js';

// Configuration des variables d'environnement
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' :
                process.env.NODE_ENV === 'staging' ? '.env.staging' : '.env';

dotenv.config({ path: envFile });

// Obtenir le répertoire courant pour ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Créer le dossier logs s'il n'existe pas
const logsDir = join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;
const HTTPS_ENABLED = process.env.HTTPS_ENABLED === 'true';

// Middlewares de sécurité
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Middlewares pour parser le JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging des requêtes
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} - ${req.ip}`);
  next();
});

// Routes de l'API
app.use('/api/myjourney/users', userRoutes);
app.use('/api/myjourney/missions', missionRoutes);

// Route de santé
app.get('/api/myjourney/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Middlewares de gestion d'erreurs
app.use(notFoundHandler);
app.use(errorHandler);

// Gestion des erreurs non capturées
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Démarrage du serveur
async function startServer() {
  try {
    // Connexion à la base de données
    try {
      await connectToDatabase();
      logger.info('Connexion à la base de données établie');
    } catch (dbError) {
      logger.warn('Impossible de se connecter à la base de données:', dbError.message);
      logger.info('L\'API démarre sans connexion à la base de données');
    }

    // Démarrage du serveur HTTP
    const httpServer = http.createServer(app);
    httpServer.listen(PORT, '0.0.0.0', () => {
      logger.info(`Serveur HTTP démarré sur le port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
      logger.info(`Health check: http://10.100.9.40:${PORT}/api/myjourney/health`);
    });

    // Démarrage du serveur HTTPS (si activé)
    if (HTTPS_ENABLED) {
      try {
        const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8');
        const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8');
        const credentials = { key: privateKey, cert: certificate };

        const httpsServer = https.createServer(credentials, app);
        httpsServer.listen(HTTPS_PORT, '0.0.0.0', () => {
          logger.info(`Serveur HTTPS démarré sur le port ${HTTPS_PORT}`);
          logger.info(`Health check HTTPS: https://10.100.9.40:${HTTPS_PORT}/api/myjourney/health`);
        });
      } catch (sslError) {
        logger.error('Erreur lors du démarrage HTTPS:', sslError.message);
        logger.info('Continuez avec HTTP uniquement');
      }
    }
  } catch (error) {
    logger.error('Erreur lors du démarrage du serveur:', error);
    // En staging, on peut continuer même si la DB n'est pas disponible
    if (process.env.NODE_ENV !== 'staging') {
      process.exit(1);
    }
  }
}

startServer();