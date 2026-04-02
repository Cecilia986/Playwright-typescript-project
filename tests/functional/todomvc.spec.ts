// 修正后的完整测试文件
import { test, expect } from '@playwright/test';

test.describe('TodoMVC Application Tests', () => {

    test('Should add a new todo item', async ({ page }) => {
        // 直接导航到 TodoMVC
        await page.goto('https://demo.playwright.dev/todomvc/');
        
        // 输入待办事项
        const todoInput = page.getByPlaceholder('What needs to be done?');
        await todoInput.fill('Buy milk');
        await todoInput.press('Enter');
        
        // 验证待办事项出现
        const todoItem = page.getByText('Buy milk');
        await expect(todoItem).toBeVisible();
    });

    test('Should mark a todo as completed', async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
        
        // 先添加一个待办
        const todoInput = page.getByPlaceholder('What needs to be done?');
        await todoInput.fill('Write report');
        await todoInput.press('Enter');
        
        // 点击复选框标记为已完成
        const todoCheckbox = page.locator('.toggle').first();
        await todoCheckbox.click();
        
        // 验证待办有 completed 类
        const todoItem = page.getByText('Write report');
        await expect(todoItem).toHaveClass(/completed/);
    });

    test('Should delete a todo item', async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
        
        // 添加一个待办
        const todoInput = page.getByPlaceholder('What needs to be done?');
        await todoInput.fill('Old task');
        await todoInput.press('Enter');
        
        // 悬停显示删除按钮，然后点击删除
        const todoItem = page.getByText('Old task');
        await todoItem.hover();
        
        // 删除按钮通常是 .destroy 类
        const deleteBtn = todoItem.locator('..').locator('.destroy');
        await deleteBtn.click();
        
        // 验证待办已移除
        await expect(todoItem).toBeHidden();
    });

    test('Should filter active/completed todos', async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
        
        // 添加两个任务，一个完成一个未完成
        const todoInput = page.getByPlaceholder('What needs to be done?');
        await todoInput.fill('Task 1');
        await todoInput.press('Enter');
        await todoInput.fill('Task 2');
        await todoInput.press('Enter');
        
        // 完成 "Task 1"
        const checkboxes = page.locator('.toggle');
        await checkboxes.first().click();
        
        // 点击 "Active" 筛选
        await page.getByRole('link', { name: 'Active' }).click();
        
        // 验证只有未完成的任务可见
        await expect(page.getByText('Task 1')).toBeHidden();
        await expect(page.getByText('Task 2')).toBeVisible();
        
        // 点击 "Completed" 筛选
        await page.getByRole('link', { name: 'Completed' }).click();
        
        // 验证只有已完成的任务可见
        await expect(page.getByText('Task 1')).toBeVisible();
        await expect(page.getByText('Task 2')).toBeHidden();
    });
});