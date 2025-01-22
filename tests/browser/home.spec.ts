import { test } from '@japa/runner'

test.group('Home', () => {
  test('requires being authenticated', async ({ visit, assert }) => {
    const page = await visit('/home')
    await page.assertUrlContains('/login')
  })
})
