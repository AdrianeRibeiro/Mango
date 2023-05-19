import { Router } from "express"
import { makeFacebookLoginController } from "@/main/factories/controllers"
import { adaptExpressRoute as adapt } from "@/infra/http"

export default (router: Router): void => {
  const controller = makeFacebookLoginController()
  const adapter = adapt(controller)

  router.post('/login/facebook', adapter)
}
