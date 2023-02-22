import { FacebookAuthentication } from "@/domain/features"
import { LoadFacebookUserApi } from "@/data/contracts/apis"
import { AuthenticationError } from "@/domain/errors"
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from "@/data/contracts/repos"

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository,
  ) {}

  async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)

    if(fbData != undefined) {
      const accountData = await this.userAccountRepo.load({ email: fbData.email })
      const userAccount = new UserAccount({
        id: accountData?.id,
        name: accountData?.name,
        email: fbData.email,
      })
      userAccount.updateWithFacebook(fbData)

      await this.userAccountRepo.saveWithFacebook({
        id: accountData?.id,
        name: accountData?.name ?? fbData.name,
        email: fbData.email,
        facebookId: fbData.facebookId
      })
    }

    return new AuthenticationError()
  }
}


class UserAccount {
  id?: string
  name?: string
  email: string
  facebookId?: string

  constructor(model: { id?: string, name?: string, email: string }) {
    this.id = model.id
    this.name = model.name
    this.email = model.email
  }

  updateWithFacebook(model: { name: string, email: string, facebookId: string }): void {
    this.email = model.email
    this.facebookId = model.facebookId
    this.name = this.name ?? model.name
  }
}
