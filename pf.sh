#!/bin/bash

# 이미지 이름 설정
IMAGE_NAME="zxcyui6181/portfolio:latest"

# 도커 이미지 빌드
echo "Building Docker image..."
docker build -t $IMAGE_NAME . || { echo "Docker build failed!"; exit 1; }

# 도커 이미지 푸시
echo "Pushing Docker image to registry..."
docker push $IMAGE_NAME || { echo "Docker push failed!"; exit 1; }

echo "Docker image build and push completed successfully!" 