#!/bin/bash

# Script de déploiement pour l'environnement staging
echo "🚀 Déploiement de l'API MyJourney en staging..."

# Arrêter les conteneurs existants
echo "📦 Arrêt des conteneurs existants..."
docker-compose -f docker-compose.staging.yml down

# Construire l'image
echo "🔨 Construction de l'image Docker..."
docker build -t myjourney-api:staging .

# Démarrer les services
echo "▶️ Démarrage des services..."
docker-compose -f docker-compose.staging.yml up -d

# Attendre que l'API soit prête
echo "⏳ Attente du démarrage de l'API..."
sleep 10

# Vérifier le statut
echo "🔍 Vérification du statut..."
curl -f http://10.100.9.40:3000/health || echo "❌ L'API n'est pas encore accessible"

echo "✅ Déploiement terminé!"
echo "🌐 API accessible sur: http://10.100.9.40:3000"
echo "📊 Health check: http://10.100.9.40:3000/health"