import { FacebookAuthentication } from "@/domain/features"
import { HttpResponse, badRequest, ok, serverError, unauthorized } from "@/application/helpers"
import { AccessToken } from "@/domain/models"
import { RequiredStringValidator, ValidationBuilder, ValidationComposite, Validator } from "@/application/validation"
import { Controller } from "@/application/controllers"

type HttpRequest = {
  token: string
}

type Model = Error | {
  accessToken: string
}
export class FacebookLoginController extends Controller {
  constructor(private readonly facebookAuthentication: FacebookAuthentication) {
    super()
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token })
    return (accessToken instanceof AccessToken)
      ? ok({ accessToken: accessToken.value })
      : unauthorized()
  }

  override buildValidators(httpRequest: HttpRequest): Validator[] {
    const validators = ValidationBuilder
      .of({ value: httpRequest.token, fieldName: 'token' })
      .required()
      .build()

    return [
      ...validators
    ]
  }
}
