import { Connection, createConnection, getConnection, getConnectionManager } from "typeorm"

jest.mock('typeorm', () => ({
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  Column: jest.fn(),
  createConnection: jest.fn(),
  getConnection: jest.fn(),
  getConnectionManager: jest.fn()
}))

class PgConnection {
  private static instance?: PgConnection

  private constructor() {}

  static getInstance (): any {
    if(PgConnection.instance === undefined) {
      PgConnection.instance == new PgConnection()
    }

    return PgConnection.instance
  }

  async connect(): Promise<void> {
    const connection = getConnectionManager().has('default')
      ? getConnection()
      : await createConnection()

    connection.createQueryRunner()
  }
}

describe('PgConnection', () => {
  let getConnectionManagerSpy: jest.Mock
  let createQueryRunnerSpy: jest.Mock
  let createConnectionSpy: jest.Mock
  let getConnectionSpy: jest.Mock
  let hasSpy: jest.Mock
  let sut: PgConnection

  beforeAll(() => {
    hasSpy = jest.fn().mockReturnValue(true)
    getConnectionManagerSpy = jest.fn().mockReturnValue({
      has: hasSpy
    })
    getConnectionManagerSpy.mockImplementation(getConnectionManager);
    //jest.fn().mockImplementation(getConnectionManagerSpy) mocked(getConnectionManager).mockImplementationOnce(getConnectionManagerSpy)


    createQueryRunnerSpy = jest.fn()
    createConnectionSpy = jest.fn().mockResolvedValue({
      createQueryRunner: createQueryRunnerSpy
    })
    createConnectionSpy.mockImplementation(createConnection)
    //jest.fn().mockImplementation(getConnectionManagerSpy) //mocked(createConnection).mockImplementationOnce(createConnectionSpy)

    getConnectionSpy = jest.fn().mockReturnValue({
      createQueryRunner: createQueryRunnerSpy
    })
    getConnectionSpy.mockImplementation(getConnection);
  })

  beforeEach(() => {
    sut = PgConnection.getInstance()
  })

  it('should have only one instance', () => {
    const sut2 = PgConnection.getInstance()

    expect(sut).toBe(sut2)
  })

  it('should create a new connection', async () => {
    hasSpy.mockReturnValueOnce(false)
    await sut.connect()

    expect(createConnectionSpy).toHaveBeenCalledWith()
    expect(createConnectionSpy).toHaveBeenCalledTimes(1)

    expect(createQueryRunnerSpy).toHaveBeenCalledWith()
    expect(createQueryRunnerSpy).toHaveBeenCalledTimes(1)
  })

  it('should use an existing connection', async () => {
    await sut.connect()

    expect(getConnectionSpy).toHaveBeenCalledWith()
    expect(getConnectionSpy).toHaveBeenCalledTimes(1)

    expect(createQueryRunnerSpy).toHaveBeenCalledWith()
    expect(createQueryRunnerSpy).toHaveBeenCalledTimes(1)
  })
})
