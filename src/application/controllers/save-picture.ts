import { InvalidMymeTypeError, MaxFileSizeError, RequiredFieldError } from "@/application/errors"
import { HttpResponse, badRequest, ok } from "@/application/helpers"
import { ChangeProfilePicture } from "@/domain/usecases"

type HttpRequest = { file: { buffer: Buffer, mimeType: string }, userId: string }
type Model = Error | { initials?: string, pictureUrl?: string }

export class SavePictureController {
  constructor(private readonly changeProfilePicture: ChangeProfilePicture) {}

  async handle ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    if(file === undefined || file === null) return badRequest(new RequiredFieldError('file'))
    if(file.buffer.length === 0) return badRequest(new RequiredFieldError('file'))
    if(!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimeType)) return  badRequest(new InvalidMymeTypeError(['png', 'jpeg']))
    if(file.buffer.length > 5 * 1024 * 1024) return badRequest(new MaxFileSizeError(5))

    const data = await this.changeProfilePicture({ id: userId, file: file.buffer })
    return ok(data)
  }
}