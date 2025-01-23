import { test } from '@japa/runner'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('login', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('shows validations errors', async ({ visit, assert }) => {
    const page = await visit('/login')
    const emailInput = page.getByLabel('Email')
    const loginBtn = page.getByText('Login')
    await emailInput.fill('axel@gmail.com')
    await loginBtn.click()
    const errorMessage = page.locator('.error-message')
    assert.isTrue(await errorMessage.isVisible())
    assert.equal(await errorMessage.textContent(), 'Por favor, llene todos los campos')
  })

  test('shows invalid credentials error', async ({ visit }) => {
    await User.create({
      email: 'axel@gmail.com',
      password: 'asdasd',
    })
    const page = await visit('/login')
    const emailInput = page.getByLabel('Email')
    const passwordInput = page.getByLabel('Password')
    const loginBtn = page.getByText('Login')
    await emailInput.fill('jonathan@gmail.com')
    await passwordInput.fill('asdasd')
    await loginBtn.click()
    await page.assertPath('/login')
  })
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
