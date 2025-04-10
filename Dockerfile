FROM node:alpine

ARG PUBLIC_API_HOST
ENV PUBLIC_API_HOST=$PUBLIC_API_HOST
# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

RUN npm run gen:client

# Build the SvelteKit application
RUN npm run build


# Expose the port that the application will run on
EXPOSE 3000

# Set the command to run the application
CMD ["node", "build"]