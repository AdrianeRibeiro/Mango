import { FacebookAuthenticationService } from "@/domain/services"
import { env } from "@/main/config/env"
import { JwtTokenGenerator } from "@/infra/crypto"
import { makeFacebookApi } from "@/main/factories/apis"
import { makePgUserAccountRepo } from "@/main/factories/repos"
import { makeJwtTokenGenerator } from "@/main/factories/crypto"

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService => {
  const jwtTokenGenerator = new JwtTokenGenerator(env.jwtSecret)
  return new FacebookAuthenticationService(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenGenerator()
  )
}
