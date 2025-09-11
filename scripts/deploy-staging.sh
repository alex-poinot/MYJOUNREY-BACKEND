#!/bin/bash

# Script de déploiement pour l'environnement staging
echo "🚀 Déploiement de l'API MyJourney en staging..."

# Arrêter les conteneurs existants
echo "📦 Arrêt des conteneurs existants..."
docker stop myjourney-api-staging 2>/dev/null || true
docker rm myjourney-api-staging 2>/dev/null || true

# Construire l'image
echo "🔨 Construction de l'image Docker..."
docker build -t myjourney-api:staging .

# Vérifier si la construction a réussi
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la construction de l'image"
    exit 1
fi

# Démarrer le conteneur
echo "▶️ Démarrage du conteneur..."

# Vérifier si le fichier .env.staging existe
if [ ! -f ".env.staging" ]; then
    echo "❌ Le fichier .env.staging n'existe pas!"
    echo "💡 Veuillez configurer vos variables d'environnement dans .env.staging"
    exit 1
fi

docker run -d \
    --name myjourney-api-staging \
    -p 3000:3000 \
    --env-file .env.staging \
    --restart unless-stopped \
    myjourney-api:staging

# Vérifier si le conteneur a démarré
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du démarrage du conteneur"
    exit 1
fi

# Attendre que l'API soit prête
echo "⏳ Attente du démarrage de l'API..."
sleep 15

# Vérifier le statut du conteneur
echo "🔍 Vérification du statut du conteneur..."
docker ps | grep myjourney-api-staging

# Vérifier les logs
echo "📋 Derniers logs du conteneur:"
docker logs --tail 10 myjourney-api-staging

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
    docker logs myjourney-api-staging
fi

echo "🌐 API accessible sur: http://10.100.9.40:3000"
echo "📊 Health check: http://10.100.9.40:3000/api/myjourney/health"
echo "📋 Pour voir les logs: docker logs -f myjourney-api-staging"