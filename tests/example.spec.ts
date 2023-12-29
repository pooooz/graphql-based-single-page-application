import { test, expect } from '@playwright/test';

test('redirect to login', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('text=Sign in')

  await expect(page).toHaveURL('http://localhost:3000/login')
  await page.click('text=Login')
  await expect(page).toHaveURL('http://localhost:3000/login')

  await page.getByPlaceholder('Username').fill('test@test.com')
  await page.getByPlaceholder('Password').fill('test@test.com')
  await page.click('text=Login')
  await expect(page).toHaveURL('http://localhost:3000/')
});
