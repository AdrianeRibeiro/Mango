import { FacebookAuthentication } from "@/domain/features"
import { HttpResponse, badRequest, ok, serverError, unauthorized } from "@/application/helpers"
import { AccessToken } from "@/domain/models"
import { RequiredStringValidator, ValidationBuilder, ValidationComposite } from "@/application/validation"

type httpRequest = {
  token: string
}

type Model = Error | {
  accessToken: string
}
export class FacebookLoginController {
  constructor(private readonly facebookAuthentication: FacebookAuthentication) {}

  async handle (httpRequest: httpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if(error != undefined) {
        return badRequest(error)
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

  private validate(httpRequest: httpRequest): Error | undefined {
    const validators = ValidationBuilder
      .of({ value: httpRequest.token, fieldName: 'token' })
      .required()
      .build()

    return new ValidationComposite(validators).validate()
  }
}
