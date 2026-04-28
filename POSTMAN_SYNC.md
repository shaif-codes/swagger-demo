# Postman Sync Pipeline

## Environment variables

Required:

- `POSTMAN_API_KEY`

One of these flows must be configured:

1. Update existing collection:
   - `POSTMAN_COLLECTION_UID`
2. Create/update by workspace (if UID is not set):
   - `POSTMAN_WORKSPACE_ID`
   - If `POSTMAN_COLLECTION_NAME` is set, sync script updates matching collection by name or creates it when missing.

Optional:

- `POSTMAN_COLLECTION_NAME` (overrides generated collection name)
- `POSTMAN_FOLDER_STRATEGY` (`Paths` for nested folders, `Tags` for flat tag groups). Default is `Paths`.

## Local sync

```bash
npm run docs:sync:postman
```

## CI sync (GitHub Actions)

Workflow file:

- `.github/workflows/postman-sync.yml`

Required GitHub secrets:

- `POSTMAN_API_KEY`
- `POSTMAN_COLLECTION_UID` (required for `main` sync)
- `POSTMAN_WORKSPACE_ID` (required for preview sync)

## Branching model used by workflow

- `main` branch updates the official collection via `POSTMAN_COLLECTION_UID`.
- Pull requests and non-main pushes upsert a preview collection in Postman workspace.
- Preview collection name pattern:
  - `Swagger Demo [preview: <branch-name>]`
