import { LoadFacebookUserApi } from "@/data/contracts/apis"
import { FacebookAuthenticationService } from "@/data/services"
import { AuthenticationError } from "@/domain/errors"
import { mock } from 'jest-mock-extended'


class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  callsCount = 0
  result = undefined

  async loadUser(params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    this.callsCount++
    return this.result
  }
}

describe('FacebookAuthenticationService - mock class', () => {
  it('should return AuthenticationError when LoadFacebookUserApi return undefined', async () => {
    const loadFacebookUserApiSpy = new LoadFacebookUserApiSpy()
    loadFacebookUserApiSpy.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUserApiSpy)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})

describe('FacebookAuthenticationService - mock with jest', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApiSpy = {
      loadUser: jest.fn()
    }
    const sut = new FacebookAuthenticationService(loadFacebookUserApiSpy)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApiSpy.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApiSpy.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi return undefined', async () => {
    const loadFacebookUserApiSpy = {
      loadUser: jest.fn()
    }
    loadFacebookUserApiSpy.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUserApiSpy)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})

describe('FacebookAuthenticationService - jest-mock-extended', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApiSpy = mock<LoadFacebookUserApi>()
    const sut = new FacebookAuthenticationService(loadFacebookUserApiSpy)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApiSpy.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApiSpy.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi return undefined', async () => {
    const loadFacebookUserApiSpy = mock<LoadFacebookUserApi>()
    loadFacebookUserApiSpy.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUserApiSpy)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
