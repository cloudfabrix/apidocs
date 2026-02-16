# Fabrix.ai RDA Platform API Docs

Interactive API reference for the **Fabrix.ai RDA Platform**, powered by Scalar and Docusaurus.

- **Live site**: `https://cloudfabrix.github.io/apidocs/`
- **Features**: code samples (curl, Python, Go, Ruby, JS, etc.), & version switching.

## Repository layout

- **OpenAPI specs**: `website/static/specs/openapi-<version>.json`
- **Site shell**: `website/` (Docusaurus + Scalar)

## Prerequisites

- Node.js **20**

## Build and preview locally

```bash
./make.sh                         # generate versions + build site
cd website && npm run serve       # preview at localhost:3000/apidocs/
```

## Adding a new API version

1. Drop `openapi-x.y.z.json` in `website/static/specs/`.
2. Push to `main` (or run `./make.sh` locally).
3. The version dropdown updates automatically.
