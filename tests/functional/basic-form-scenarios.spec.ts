import { test, expect } from '@playwright/test';

test.describe('The internet - From operation', () =>{

    test('1.1 Login-sucess', async ({page}) =>{
        // Visit the homepage before each test
        await page.goto('https://the-internet.herokuapp.com/login');

        await page.getByRole('textbox', {name: 'Username' }).fill('tomsmith');
        await page.getByRole('textbox', {name: 'Password' }).fill('SuperSecretPassword!');
        await page.getByRole('button', {name: 'Login' }).click();

        // Verify login successfully
        await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
        await page.screenshot({ path: 'test-results/login-success.png'});   
    })

    test('1.2 Login-Fail', async ({page}) =>{
        // Visit the homepage before each test
        await page.goto('https://the-internet.herokuapp.com/login');

        await page.getByRole('textbox', {name: 'Username' }).fill('tomsmith');
        await page.getByRole('textbox', {name: 'Password' }).fill('Wrongpassword!');
        await page.getByRole('button', {name: 'Login' }).click();

        // Verify 
        const errorAlert = page.locator('.flash.error');
        await expect(errorAlert).toContainText('Your password is invalid!');
        await expect(errorAlert).toBeVisible();  
    })

    test('1.3 Checkbox operation', async ({page}) =>{
        await page.goto('https://the-internet.herokuapp.com/checkboxes');

        const checkboxes = page.locator('input[type="checkbox"]');
        
        //Get the initial state
        const firstChecked = await checkboxes.first().isChecked();
        const lastChecked = await checkboxes.last().isChecked();
        console.log(`Initial State-Checkbox 1: ${firstChecked}, Checkbox 2: ${lastChecked}`);

        //Change state
        await checkboxes.first().check();
        await checkboxes.last().uncheck();

        // Verify new state
        await expect(checkboxes.first()).toBeChecked();
        await expect(checkboxes.last()).not.toBeChecked();
    });

    test('1.4 dropdown selector', async ({ page}) =>{
        await page.goto('https://the-internet.herokuapp.com/dropdown');

        const dropdown =page.locator('#dropdown');

        //Select by values
        await dropdown.selectOption('1');
        await expect(dropdown).toHaveValue('1');

        //Select by label
        await dropdown.selectOption({label: 'Option 2'});
        await expect(dropdown).toHaveValue('2');

        //Select by index
        await dropdown.selectOption({ index: 1});
        await expect(dropdown).toHaveValue('1');
    });
})