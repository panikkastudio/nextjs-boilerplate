ARG NODE_VERSION=20
ARG PROJECT=workers

# Alpine image
FROM  node:${NODE_VERSION}-slim AS slim
RUN apt-get update
RUN apt-get install libssl-dev curl -y

# Setup npm on the alpine base
FROM slim as base

RUN npm install turbo --global
RUN npm install dotenv-cli --global
RUN npm install pnpm --global --force

# Prune projects
FROM base AS pruner
ARG PROJECT

WORKDIR /app
COPY . .
RUN turbo prune --scope=${PROJECT} --docker

# Build the Project
FROM base AS builder
ARG PROJECT
WORKDIR /app

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/json/ .

# First install the dependencies (as they change less often)
RUN pnpm install --production=false

# Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .

#TODO: Uncomment the following line if you plan to use prisma
# RUN turbo run db:generate

RUN turbo run build --filter=${PROJECT}

RUN pnpm install --production
# RUN rm -rf ./**/*/src

# Final image
FROM base AS runner
ARG PROJECT

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

WORKDIR /app
RUN pnpm i debug
COPY --from=builder --chown=nodejs:nodejs /app .
WORKDIR /app/apps/${PROJECT}

ARG PORT=3000
ENV PORT=${PORT}
ENV NODE_ENV=production
EXPOSE ${PORT}

CMD pnpm start