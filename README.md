# gcs-bucket-upload

### Google Cloud config:
- create storage bucket
- to upload from browser, we need to config bucket's CORS in cloud shell (the shell icon on topbar of google cloud console web app):
https://cloud.google.com/storage/docs/configuring-cors#gsutil
with this config:
```json
[
    {
      "origin": ["*"],
      "method": ["GET", "HEAD", "PUT", "POST"],
      "responseHeader": ["Content-Type"],
      "maxAgeSeconds": 3600
    }
]
```
- create and download service account json to use it below

### API:
- create env: `cp .env.example .env`
- set bucket name and absolute path to GCP service account json 
- start api server: `yarn start`

### WEB ENV:
- `cd frontend`
- create env: `cp .env.example .env`
- set API URL (for signing files) and storage's public URL (for showing uploaded image).
- start web server: `yarn start`

