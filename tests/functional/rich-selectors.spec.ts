import { test, expect } from '@playwright/test';

test.describe('Learn Selector', () =>{

    test.beforeEach(async ({ page }) =>{
        //Visit the homepage
        await page.goto('https://the-internet.herokuapp.com/');
    });

    test('1. Study the Link selector', async ({page}) =>{
        
    })
})