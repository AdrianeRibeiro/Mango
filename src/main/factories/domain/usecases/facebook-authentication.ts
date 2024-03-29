import { setupFacebookAuthentication, FacebookAuthentication } from "@/domain/usecases"
import { makeFacebookApi, makeJwtTokenHandler } from "@/main/factories/infra/gateways"
import { makePgUserAccountRepo } from "@/main/factories/infra/repos"

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandler()
  )
}
