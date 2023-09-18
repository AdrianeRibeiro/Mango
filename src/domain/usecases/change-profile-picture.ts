import { UUIDGenerator, UploadFile, DeleteFile } from "@/domain/contracts/gateways"
import { SaveUserPicture, LoadUserProfile } from "@/domain/contracts/repos"
import { UserProfile } from "@/domain/entities"

type Setup = (fileStorage: UploadFile & DeleteFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPicture & LoadUserProfile) => ChangeProfilePicture
type Input = { id: string, file?: { buffer: Buffer, mimeType: string } }
type Output = { pictureUrl?: string, initials?: string }
export type ChangeProfilePicture = (input: Input) => Promise<Output>

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfileRepo) => async ({ id, file }) => {
  const key = crypto.uuid({ key: id })
  const data: { pictureUrl?: string, name?: string } = {}

  if (file !== undefined) {
    const mimeType = file?.mimeType.split('/')[1]
    data.pictureUrl = await fileStorage.upload({ file: file.buffer, fileName: `${key}.${mimeType}` })
  } else {
    data.name = (await userProfileRepo.load({ id }))?.name
  }

  const userProfile = new UserProfile(id)
  userProfile.setPicture(data)

  try {
    await userProfileRepo.savePicture(userProfile)
  } catch (error) {
    if (file !== undefined) await fileStorage.delete({ fileName: key })
    throw error
  }

  return userProfile
}
