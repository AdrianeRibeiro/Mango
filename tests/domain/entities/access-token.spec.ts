import { AccessToken } from "@/domain/entities"

describe('Access Token', () => {
  it("should cexpire in 1800000 ms", () => {
    expect(AccessToken.expirationInMs).toEqual(1800000)
  })
})


