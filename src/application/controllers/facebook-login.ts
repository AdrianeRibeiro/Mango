import { FacebookAuthentication } from "@/domain/features"
import { HttpResponse, badRequest, ok, serverError, unauthorized } from "@/application/helpers"
import { AccessToken } from "@/domain/models"
import { RequiredFieldError, ServerError } from "@/application/errors"

type httpRequest = {
  token: string | undefined | null
}

type Model = Error | {
  accessToken: string
}
export class FacebookLoginController {
  constructor(private readonly facebookAuthentication: FacebookAuthentication) {}

  async handle (httpRequest: httpRequest): Promise<HttpResponse<Model>> {
    try {
      if(httpRequest.token == '' || httpRequest.token == null || httpRequest.token == undefined) {
        return badRequest(new RequiredFieldError('token'))
      }

      const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token })
      if (accessToken instanceof AccessToken) {
        return ok({ accessToken: accessToken.value })
      } else {
        return unauthorized()
      }
    } catch (error: any) {
      return serverError(error)
    }
  }
}
