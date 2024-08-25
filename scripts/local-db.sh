docker run \
  --name pod-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=pod \
  -p 5432:5432 \
  -d postgres

echo "A postgres container started..."
echo "NAME: pod-db"
echo "URI: postgres://user:password@localhost:5432/pod"

echo "✅ Database is running."

echo "Next steps:"
echo "1. Generate drizzle migrations: bun generate"
echo "2. Migrate drizzle: bun migrate"
echo "3. Run the app: bun dev"