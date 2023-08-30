import { Router } from "express"
import { makeFacebookLoginController } from "@/main/factories/application/controllers"
import { adaptExpressRoute as adapt } from "@/main/adapters"

export default (router: Router): void => {
  const controller = makeFacebookLoginController()
  const adapter = adapt(controller)

  router.post('/login/facebook', adapter)
}
