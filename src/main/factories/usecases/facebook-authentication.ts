import { setupFacebookAuthentication, FacebookAuthentication } from "@/domain/usecases"
import { env } from "@/main/config/env"
import { JwtTokenGenerator } from "@/infra/crypto"
import { makeFacebookApi } from "@/main/factories/apis"
import { makePgUserAccountRepo } from "@/main/factories/repos"
import { makeJwtTokenGenerator } from "@/main/factories/crypto"

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  const jwtTokenGenerator = new JwtTokenGenerator(env.jwtSecret)
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenGenerator()
  )
}
