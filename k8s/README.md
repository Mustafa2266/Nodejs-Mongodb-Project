Kubernetes manifests for this project

Files:
- `mongo-deployment.yaml` — PersistentVolumeClaim, Deployment and ClusterIP Service for MongoDB.
- `nodejs-deployment.yaml` — Deployment and NodePort Service for the Node.js app. The deployment references image `your-registry/nodejs-newapp:latest` as a placeholder.

Quick steps (kind cluster)

1. If using `kind`, build and load the image into the cluster:

```bash
# from project root where Dockerfile for nodejs app exists
docker build -t nodejs-newapp:local .
kind load docker-image nodejs-newapp:local --name kind-cluster
```

2. Apply manifests:

```bash
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/nodejs-deployment.yaml
```

3. Access the Node.js app locally (NodePort):

```bash
# on the kind host this maps to port 30050
curl http://localhost:30050/
```

Notes:
- The `nodejs-deployment.yaml` uses `mongodb://mongo:27017/nodejs_app` for `MONGO_URI`. This assumes Mongo runs without auth.
- Replace the `image:` in the Node.js manifest with your registry/image tag if you push to a registry.
- If you prefer ClusterIP for public access, change `nodejs-service` type to `ClusterIP` and use `kubectl port-forward`.
