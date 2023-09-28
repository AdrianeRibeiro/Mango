import { PgUser } from '@/infra/repos/postgres/entities/user'
import { FacebookApi } from '@/infra/gateways'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'
import { UnauthorizedError } from '@/application/errors'

import { IBackup } from 'pg-mem'
import { getConnection } from 'typeorm'
import request from 'supertest'

describe('User Routes', () => {
  describe('DELETE /users/picture', () => {
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      backup.restore()
    })

    it('should return 403 with no authorization header is present', async() => {
      const { status, body } = await request(app)
                                    .delete('/api/users/picture')

      expect(status).toBe(403)
    })
  })
})
