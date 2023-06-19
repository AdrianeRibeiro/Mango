/*import { LoadFacebookUser } from "@/domain/contracts/apis"
import { FacebookAuthenticationService } from "@/domain/services"
import { AuthenticationError } from "@/domain/errors"
import { mock, MockProxy } from 'jest-mock-extended'


class LoadFacebookUserApiSpy implements LoadFacebookUser {
  token?: string
  callsCount = 0
  result = undefined

  async loadUser(params: LoadFacebookUser.Params): Promise<LoadFacebookUser.Result> {
    this.token = params.token
    this.callsCount++
    return this.result
  }
}

type SutTypes = {
  sut: FacebookAuthenticationService
  loadFacebookUserApi: MockProxy<LoadFacebookUser>
}

const makeSut = (): SutTypes => {
  const loadFacebookUserApi = mock<LoadFacebookUser>()
  const sut = new FacebookAuthenticationService(loadFacebookUserApi)
  return {
    sut,
    loadFacebookUserApi
  }
}

describe('FacebookAuthenticationService - mock class', () => {
  it('should return AuthenticationError when LoadFacebookUser return undefined', async () => {
    const loadFacebookUserApiSpy = new LoadFacebookUserApiSpy()
    loadFacebookUserApiSpy.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUserApiSpy)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})

describe('FacebookAuthenticationService - mock with jest', () => {
  const token = 'any_token'

  it('should call LoadFacebookUser with correct params', async () => {
    const loadFacebookUserApiSpy = {
      loadUser: jest.fn()
    }
    const sut = new FacebookAuthenticationService(loadFacebookUserApiSpy)

    await sut.perform({ token })

    expect(loadFacebookUserApiSpy.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApiSpy.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUser return undefined', async () => {
    const loadFacebookUserApiSpy = {
      loadUser: jest.fn()
    }
    loadFacebookUserApiSpy.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUserApiSpy)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })
})

describe('FacebookAuthenticationService - jest-mock-extended', () => {
  it('should call LoadFacebookUser with correct params', async () => {
    const { sut, loadFacebookUserApi } = makeSut()

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUser return undefined', async () => {
    const { sut, loadFacebookUserApi } = makeSut()
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
*/
