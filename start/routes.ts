/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const HomeController = () => import('#controllers/home_controller')
const LoginController = () => import('#controllers/login_controller')
const TodosController = () => import('#controllers/todos_controller')

router.get('/home', [HomeController, 'index']).use(middleware.auth({ guards: ['web'] }))
router.get('/todos', [TodosController, 'index']).use(middleware.auth({ guards: ['api'] }))
router.get('/login', [LoginController, 'index'])
router.post('/login', [LoginController, 'store'])
