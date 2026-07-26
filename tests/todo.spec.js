const { test, expect } = require('@playwright/test');

test('supports adding, completing, deleting, and toggling theme', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /my tasks/i })).toBeVisible();
  await expect(page.getByText('Add a task to get started')).toBeVisible();

  await page.getByPlaceholder('What needs to be done?').fill('Write report');
  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByText('Write report')).toBeVisible();
  await expect(page.locator('#empty-state')).toBeHidden();

  await page.locator('.todo-checkbox').check();
  await expect(page.locator('.todo-item')).toHaveClass(/completed/);

  await page.locator('.delete-btn').click();
  await expect(page.getByText('Write report')).toHaveCount(0);
  await expect(page.getByText('Add a task to get started')).toBeVisible();

  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).toHaveClass(/dark-mode/);
  await expect(page.locator('#theme-toggle')).toContainText('☀️');
});
