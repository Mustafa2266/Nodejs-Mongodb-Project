FROM node:20-slim
# 
WORKDIR /usr/src/app
# 
# Install build tools for native modules, then remove them after install to keep image small
# Copies package.json AND package-lock.json (if exists)
COPY package*.json ./
RUN apt-get update \ 
	# Installs build tools, compiles better-sqlite3, removes build tools
	&& apt-get install -y --no-install-recommends build-essential python3 make g++ ca-certificates \
	# Installs only production deps (no nodemon)
	&& npm install --production \
	&& apt-get remove -y build-essential python3 make g++ \
	&& apt-get autoremove -y \
	&& rm -rf /var/lib/apt/lists/*
# 
# Copy app source
COPY . .
# 
# Ensure data directory exists and is writable
RUN mkdir -p /usr/src/app/data
# 
VOLUME ["/usr/src/app/data"]
# 
EXPOSE 3000
# 
CMD ["npm", "start"]


# End of Dockerfile