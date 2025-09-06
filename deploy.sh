#!/bin/bash

# Script para despliegue rápido
echo "🚀 Desplegando FinTrackfy..."

# Verificar que estamos en la rama main
git checkout main

# Agregar cambios y hacer commit
echo "📝 Agregando cambios..."
git add .

# Solicitar mensaje de commit
echo "💬 Ingresa el mensaje de commit:"
read commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

git commit -m "$commit_message"

# Push a GitHub (esto disparará el auto-deploy en Vercel)
echo "⬆️ Subiendo a GitHub..."
git push origin main

echo "✅ Código enviado a GitHub."
echo "🔄 Vercel debería iniciar el despliegue automáticamente."
echo "📍 Ve a tu dashboard de Vercel para monitorear el progreso."