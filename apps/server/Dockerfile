FROM node:18-alpine

WORKDIR /app

# Install dependencies
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Create startup script that runs migrations then starts app
RUN echo '#!/bin/bash\necho "Running database migrations..."\nnpm run db:migrate || echo "Migration failed, continuing..."\necho "Starting application..."\nnpm start' > /app/start.sh && chmod +x /app/start.sh

# Start the application with migrations
CMD ["/app/start.sh"]