import { ConnectionOptions } from 'typeorm'

export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '254685603576440',
    clientSecret: process.env.FB_CLIENT_SECRET ?? '170d92af8f36662bb28b6126643156f9',
    token: 'EAADnopzuOngBAO4FqUT8IxFGzq1muX0BPSQm0KnhQ8yKR5tZBIlTERtGz0tL3HxbXxWhEhiRY7yIoAGSZBScHyF3c3Hj0MRtNYhs4cOtrahw0XgQEZBB1auZAaFcxfBuueqDZBjm6thZCFbGUd2aTmXMxqIKI0iIYcZAaqDyIzeux124jF9yAtZCQzauR2jQRrR6eOhoRal9XQyrGF3ilV1dH3WdnaNUWgtgYEZCBOaiYgTls4ADY7dqz'
  },
  s3: {
    accessKey: process.env.AWS_S3_ACCESS_KEY ?? 'accessKey',
    secret: process.env.AWS_S3_SECRET ?? 'secret',
    bucket: process.env.AWS_S3_BUCKET ?? 'bucket',
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWTSECRET ?? 'asdfg123'
}

