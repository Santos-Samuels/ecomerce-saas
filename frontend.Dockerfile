# Dockerfile para o Frontend (Next.js) no monorepo
FROM node:20-slim AS builder

WORKDIR /app

# Copiar arquivos de configuração da raiz
COPY package.json yarn.lock ./

# Copiar os package.json de todos os workspaces para instalar as dependências
COPY frontend/package.json ./frontend/
COPY shared/package.json ./shared/
COPY backend/package.json ./backend/

# Instalar dependências
RUN yarn install --frozen-lockfile

# Copiar o código fonte necessário (frontend e shared)
COPY shared/ ./shared/
COPY frontend/ ./frontend/

# Build do shared e do frontend
RUN yarn workspace @ecomerce/shared build || true

# Next.js build precisa de algumas variáveis no tempo de build se forem expostas (NEXT_PUBLIC_*)
# Essas variáveis devem ser passadas via --build-arg no deploy ou configuradas no fly.toml [build.args]
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN yarn workspace frontend build

# --- Stage 2: Runtime ---
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Next.js standalone output (se configurado) ou build padrão
# Para Next.js 13+ o ideal é usar standalone, mas vamos usar o start padrão por enquanto
# Copiar arquivos necessários do builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/frontend ./frontend
COPY --from=builder /app/shared ./shared

EXPOSE 3000

CMD ["yarn", "workspace", "frontend", "start"]
