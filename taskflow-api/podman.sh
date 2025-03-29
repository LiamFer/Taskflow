podman run -d \
  --name taskflow-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin123 \
  -e POSTGRES_DB=taskflow \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  docker.io/library/postgres:latest