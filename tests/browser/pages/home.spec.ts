import { test } from '@japa/runner'

test.group('Home page', () => {
  test('see welcome message', async ({ visit }) => {
    // Given - Arrange

    // When - Act
    const page = await visit('/')

    // Then - Assert
    await page.assertTextContains('body', 'It Works!')
  })
})
