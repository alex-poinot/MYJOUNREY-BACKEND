#!/bin/bash

# Script de déploiement avec Docker Compose pour l'environnement staging
echo "🚀 Déploiement de l'API MyJourney en staging avec Docker Compose..."

# Vérifier si docker compose est disponible
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
else
    echo "❌ Docker Compose n'est pas installé ou accessible"
    echo "💡 Utilisez le script deploy-staging.sh à la place"
    exit 1
fi

echo "📦 Utilisation de: $DOCKER_COMPOSE_CMD"

# Arrêter les conteneurs existants
echo "📦 Arrêt des conteneurs existants..."
$DOCKER_COMPOSE_CMD -f docker-compose.staging.yml down

# Construire l'image
echo "🔨 Construction de l'image Docker..."
$DOCKER_COMPOSE_CMD -f docker-compose.staging.yml build

# Démarrer les services
echo "▶️ Démarrage des services..."
$DOCKER_COMPOSE_CMD -f docker-compose.staging.yml up -d

# Attendre que l'API soit prête
echo "⏳ Attente du démarrage de l'API..."
sleep 15

# Vérifier le statut
echo "🔍 Vérification du statut..."
$DOCKER_COMPOSE_CMD -f docker-compose.staging.yml ps

# Afficher les logs
echo "📋 Derniers logs:"
$DOCKER_COMPOSE_CMD -f docker-compose.staging.yml logs --tail 10

# Tester la connexion
echo "🔍 Test de connexion à l'API..."
for i in {1..5}; do
    if curl -f http://10.100.9.40:3000/api/myjourney/health >/dev/null 2>&1; then
        echo "✅ L'API est accessible!"
        break
    else
        echo "⏳ Tentative $i/5 - En attente..."
        sleep 5
    fi
done

# Test final
if curl -f http://10.100.9.40:3000/api/myjourney/health >/dev/null 2>&1; then
    echo "✅ Déploiement réussi!"
else
    echo "❌ L'API n'est pas encore accessible"
    echo "📋 Logs détaillés:"
    $DOCKER_COMPOSE_CMD -f docker-compose.staging.yml logs
fi

echo "✅ Déploiement terminé!"
echo "🌐 API accessible sur: http://10.100.9.40:3000"
echo "📊 Health check: http://10.100.9.40:3000/api/myjourney/health"