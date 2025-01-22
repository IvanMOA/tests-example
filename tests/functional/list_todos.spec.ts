import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'

test.group('List todos', () => {
  test('requires being authenticated', async ({ assert, client }) => {
    const response = await client.get('/todos')

    response.assertStatus(401)
  })

  test('shows a todo list', async ({ assert, client }) => {
    const user = await UserFactory.create()

    const response = await client.get('/todos').loginAs(user)

    response.assertStatus(200)
  })
})
