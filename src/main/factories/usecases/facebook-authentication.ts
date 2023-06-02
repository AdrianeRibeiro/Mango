import { setupFacebookAuthentication, FacebookAuthentication } from "@/domain/usecases"
import { env } from "@/main/config/env"
import { JwtTokenHandler } from "@/infra/crypto"
import { makeFacebookApi } from "@/main/factories/apis"
import { makePgUserAccountRepo } from "@/main/factories/repos"
import { makeJwtTokenHandler } from "@/main/factories/crypto"

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandler()
  )
}
