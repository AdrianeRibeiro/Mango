import { UUIDHandler } from '@/infra/crypto'
import { v4 } from 'uuid'

jest.mock('uuid')

describe('UUIDHandler', () => {
  let sut: UUIDHandler

  beforeEach(() => {
    sut = new UUIDHandler()
  })

  it('should call uuid.v4', () => {
    sut.uuid({ key: 'any_key' })

    expect(v4).toHaveBeenCalledTimes(1)
  })

  it('should return correct uuid', () => {
    //mocked(v4).mockReturnValueOnce('any_uuid')

    sut.uuid({ key: 'any_key' })

    expect(v4).toBe('any_key_any_uuid')
  })
})
