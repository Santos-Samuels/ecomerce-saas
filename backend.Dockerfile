# ---------- Stage 1: Builder ----------
FROM node:20-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y openssl libssl-dev python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copia arquivos de workspace
COPY package.json yarn.lock ./
COPY backend/package.json ./backend/
COPY shared/package.json ./shared/
COPY frontend/package.json ./frontend/

# Instala TODAS dependências (inclui dev)
RUN yarn install --frozen-lockfile

# Copia código
COPY shared/ ./shared/
COPY backend/ ./backend/

# Gera Prisma Client (usando prisma já instalado no workspace)
RUN yarn workspace backend prisma generate

# Build
RUN yarn workspace @ecomerce/shared build
RUN yarn workspace backend build



# ---------- Stage 2: Runtime ----------
FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*

# Copia apenas arquivos necessários
COPY package.json yarn.lock ./
COPY backend/package.json ./backend/package.json
COPY shared/package.json ./shared/package.json

# Instala deps
RUN yarn install --frozen-lockfile

# Copia artefatos do builder
COPY --from=builder /app/shared/dist ./shared/dist
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/prisma ./backend/prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma

ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

# 🚀 SOMENTE inicia a aplicação
CMD ["node", "backend/dist/main.js"]