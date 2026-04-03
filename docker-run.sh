# docker-run.sh (Linux/Mac)
#!/bin/bash

# Build a image
echo " Building Docker image..."
docker build -t playwright-tests .

# run test
echo " Running tests in Docker..."
docker run --rm \
  -e ENV=qa \
  -v $(pwd)/test-results:/app/test-results \
  -v $(pwd)/playwright-report:/app/playwright-report \
  playwright-tests

# Check result
echo " Tests completed! Check ./playwright-report/index.html"