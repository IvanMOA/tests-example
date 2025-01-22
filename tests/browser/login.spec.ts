import { test } from '@japa/runner'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('login', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('shows validations errors', async ({}) => {})
  test('shows invalid credentials error', async ({}) => {})
  test('login', async ({ visit }) => {
    // Given
    await User.create({
      email: 'axel@gmail.com',
      password: 'asdasd',
    })
    const page = await visit('/login')
    const emailInput = page.getByLabel('Email')
    const passwordInput = page.getByLabel('Password')
    const loginBtn = page.getByText('Login')
    // When
    await emailInput.fill('axel@gmail.com')
    await passwordInput.fill('asdasd')
    await loginBtn.click()
    // Then
    await page.assertText('body', 'Home page')
  })
})
