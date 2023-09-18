import { AwsS3FileStorage } from '@/infra/gateways'
import { env } from '@/main/config/env'

import axios from 'axios'

describe('Aws S3 integration Tests', () => {
  let sut: AwsS3FileStorage

  beforeEach(() => {
    sut = new AwsS3FileStorage(
      env.s3.accessKey,
      env.s3.secret,
      env.s3.bucket
    )
  })

  it('should upload and delete image from aws s3', async () => {
    const onePixelImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P4DwQACfsD/Z8fLAAAAAAASUVORK5CYII='
    const key = 'any_key.png'
    const file = Buffer.from(onePixelImage, 'base64')

    const pictureUrl = await sut.upload({ key, file })

    expect((await axios.get(pictureUrl)).status).toBe(200)

    await sut.delete({ key })
    expect(axios.get(pictureUrl)).rejects.toThrow()
  })
})
