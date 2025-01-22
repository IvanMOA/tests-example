import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'
import { inject } from '@adonisjs/core'

@inject()
export default class HomeController {
  async index({}: HttpContext) {
    return 'Home page'
  }
}
