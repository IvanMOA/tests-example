import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async index({ view }: HttpContext) {
    return view.render('pages/login')
  }
  async store({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    console.log(email, password)
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)
    response.redirect('/home')
  }
}
