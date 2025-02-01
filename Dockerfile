# Use the official NGINX image from the Docker Hub
FROM nginx:latest

# Copy the custom index.html file to the NGINX HTML directory
COPY index.html /usr/share/nginx/html/index.html

# Expose port 80 (the default HTTP port for NGINX)
EXPOSE 80
