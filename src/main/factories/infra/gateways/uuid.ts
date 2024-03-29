import { UUIDHandler, UniqueId } from "@/infra/gateways"

export const makeUUIDHandler = (): UUIDHandler => {
  return new UUIDHandler()
}

export const makeUniqueId = (): UniqueId => {
  return new UniqueId()
}
