import { PgUser } from '@/infra/repos/postgres/entities/user'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'
import { PgConnection } from '@/infra/repos/postgres/helpers'

import { IBackup } from 'pg-mem'
import { Repository, getRepository } from 'typeorm'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { env } from '@/main/config/env'

describe('User Routes', () => {
  let backup: IBackup
  let pgUserRepo: Repository<PgUser>
  let connection: PgConnection

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = connection.getRepository(PgUser)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(() => {
    backup.restore()
  })

  describe('DELETE /users/picture', () => {
    it('should return 403 with no authorization header is present', async() => {
      const { status } = await request(app)
                                    .delete('/api/users/picture')

      expect(status).toBe(403)
    })

    it('should return 200 with valid data', async() => {
      const { id } = await pgUserRepo.save({ email: 'any_email', name: 'Adriane Ribeiro' })
      const authorization = sign({ key: id }, env.jwtSecret)

      const { status, body } = await request(app)
                                    .delete('/api/users/picture')
                                    .set({ authorization })

      expect(status).toBe(200)
      expect(body).toEqual({ pictureUrl: undefined, initials: 'AR' })
    })
  })

  describe('PUT /users/picture', () => {
    const uploadSpy = jest.fn()

    jest.mock('@/infra/gateways/aws-s3-file-storage', () => ({
      AwsS3FileStorage: jest.fn().mockReturnValue({ upload: uploadSpy })
    }))

    it('should return 403 with no authorization header is present', async() => {
      const { status } = await request(app)
                                    .delete('/api/users/picture')

      expect(status).toBe(403)
    })

    it('should return 200 with valid data', async() => {
      uploadSpy.mockResolvedValueOnce('any_url')
      const { id } = await pgUserRepo.save({ email: 'any_email', name: 'Adriane Ribeiro' })
      const authorization = sign({ key: id }, env.jwtSecret)

      const { status, body } = await request(app)
                                    .put('/api/users/picture')
                                    .set({ authorization })
                                    .attach('picture', Buffer.from('any_buffer'), { filename: 'any_name', contentType: 'image/png' })

      expect(status).toBe(200)
      expect(body).toEqual({ pictureUrl: 'any_url', initials: undefined })
    })
  })
})
