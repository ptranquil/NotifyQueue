FROM node:latest

# Create and set the working directory
RUN mkdir /code
WORKDIR /code

# Copy package.json and install dependencies
COPY package.json /code/
RUN npm install

# Install pm2 globally
RUN npm install -g pm2

# Copy the PM2 configuration file
COPY pm2.config.js /code/

# Set the environment variable to production
ENV NODE_ENV=production

# Copy the compiled TypeScript code from the build folder to /code in the container
COPY ./build /code/

# Start the application using PM2
CMD ["pm2-runtime", "start", "pm2.config.js", "--env", "production"]
