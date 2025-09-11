#!/bin/bash

# Script pour générer un certificat SSL auto-signé pour le développement
# ⚠️ NE PAS UTILISER EN PRODUCTION - Utilisez Let's Encrypt ou un certificat valide

echo "🔐 Génération d'un certificat SSL auto-signé..."

# Créer le dossier certs s'il n'existe pas
mkdir -p certs

# Générer la clé privée
openssl genrsa -out certs/private-key.pem 2048

# Générer le certificat auto-signé
openssl req -new -x509 -key certs/private-key.pem -out certs/certificate.pem -days 365 \
    -subj "/C=FR/ST=France/L=Paris/O=Grant Thornton/OU=IT/CN=myjourney-test.grant-thornton.fr"

echo "✅ Certificat SSL généré dans le dossier certs/"
echo "📁 Fichiers créés:"
echo "   - certs/private-key.pem (clé privée)"
echo "   - certs/certificate.pem (certificat)"
echo ""
echo "🔧 Pour activer HTTPS, modifiez .env.staging:"
echo "   HTTPS_ENABLED=true"
echo ""
echo "⚠️  ATTENTION: Certificat auto-signé - Les navigateurs afficheront un avertissement"
echo "💡 Pour la production, utilisez Let's Encrypt ou un certificat valide"