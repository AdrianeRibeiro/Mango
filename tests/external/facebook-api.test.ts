import { FacebookApi } from "@/infra/apis"
import { AxiosHttpClient } from "@/infra/http"
import { env } from '@/main/config/env'

describe('Facebook API integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
  })

  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: '8e941699dca5cd7f5b3677897442a64b' })

    expect(fbUser).toEqual({
      facebookId: '7927',
      name: 'Adriane Ribeiro',
      email: 'adrianeribeiro94@yahoo.com.br'
    })
  })

  it('should return a undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'any_token' })

    expect(fbUser).toBeUndefined()
  })
})
