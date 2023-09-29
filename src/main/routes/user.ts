import { adaptExpressRoute as adapt } from '@/main/adapters'
import { MakeDeletePictureController } from "@/main/factories/application/controllers"

import { Router } from "express"
import { auth } from "@/main/middlewares"

export default (router: Router): void => {
  router.delete('/users/picture', auth, adapt(MakeDeletePictureController()))
}
