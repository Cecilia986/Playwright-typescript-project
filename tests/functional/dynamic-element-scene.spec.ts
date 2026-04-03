import {test, expect} from '@playwright/test';
import { displayPartsToString } from 'typescript';
// ============================================
  // 2. Dynamic elements
  // ============================================
test.describe('Dynamic elements', () =>{

    test('2.1 Loading- hidden elements', async ({ page }) =>{
        await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

        await page.click('button:has-text("Start")');

        //Waiting for elements loading
        const finishText = page.locator('#finish');
        await finishText.waitFor({state: 'visible'});

        await expect(finishText).toHaveText('Hello World!');
    });

    test('2.2 Dynamic loading - Elements after rendering', async ({ page }) =>{
        await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');
        await page.click('button:has-text("Start")');

        //waiting for elements appear
        const finishText = page.locator('#finish');
        await expect(finishText).toHaveText('Hello World!', {timeout: 10000});
    });

    test('2.3 Dynamic control', async ({ page }) =>{
        await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

        // Check the checkbox A
        const checkboxes = page.locator('input[type="checkbox"]');
        await checkboxes.first().check();

        //verify it is checked
        await expect(checkboxes.first()).toBeChecked();
        console.log('The checkbox A has been checked');

        //Remove a checkbox
        await page.click('button:has-text("Remove")');
        const message =page.locator('#message');
        await expect(message).toHaveText("It's gone!");

        //Add a checkbox back
        await page.click('button:has-text("Add")');
        await expect(message).toHaveText("It's back!");

        //If it's not checked, it's not available to remove
        const isChecked = await checkboxes.isChecked();
        if(isChecked){
            //only remove if checked
            await page.click('button:has-text("Remove")');
            const message = page.locator('#message');
            await expect(message).toHaveText("It's gone!");
            console.log('Checkbox was checked, so it was removed');
        }else{
            //skip removal if not checked
            console.log('Checkbox is not checked, skipping removal');
        }
    });
});
// ============================================
  // 3. popups and prompt
  // ============================================
test.describe('Handle popups', () =>{
    test('3.1 JavaScript Alert', async ({ page }) =>{
         await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
        
        //Listening popups
        page.on('dialog', async dialog =>{
            expect(dialog.message()).toBe('I am a JS Alert');
            await dialog.accept();
        });
         // Click JS Alert
         await page.click('button:has-text("Click for JS Alert")');
         // Verify results
         await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
    });

    test('Js Confirm-accept', async ({page}) =>{
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', async dialog =>{
            expect(dialog.message()).toBe('I am a JS Confirm');
            await dialog.accept();
        });

        await page.click('button:has-text("Click for JS Confirm")');
        await expect(page.locator('#result')).toHaveText('You clicked: Ok');
    });

    test('Js Confirm-cancel', async ({page}) =>{
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', async dialog =>{
            expect(dialog.message()).toBe('I am a JS Confirm');
            await dialog.dismiss();
        });

        await page.click('button:has-text("Click for JS Confirm")');
        await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
    });

    test('Js Prompt-Enter', async ({page}) =>{
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', async dialog =>{
            expect(dialog.message()).toBe('I am a JS prompt');
            await dialog.accept('Playwright test');
        });

        await page.click('button:has-text("Click for JS Prompt")');
        await expect(page.locator('#result')).toHaveText('You entered: Playwright test');
    });
    
    test('Js Prompt-Cancel', async ({ page }) =>{
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

        page.on('dialog', async dialog =>{
            expect(dialog.message()).toBe('I am a JS prompt');
            await dialog.dismiss();
        });

        await page.click('button:has-text("Click for JS Prompt")');
        await expect(page.locator('#result')).toHaveText('You entered: null');
    });
});
 // ============================================
  // 4. Mouse and Keyboard operation
// ============================================
test.describe('Mouse and keyboard operation', () =>{
    test('4.1 drag and drop operation', async ({page}) =>{
        await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

        const columnA = page.locator('#column-a');
        const columnB = page.locator('#column-b');

        //Drag A to B
        await columnA.dragTo(columnB);

        //Verify
        await expect(columnA).toHaveText('B');
        await expect(columnB).toHaveText('A');
    });

    test('4.2 Right-click (context menu)', async ({ page }) =>{
        await page.goto('https://the-internet.herokuapp.com/context_menu');

        const hotspot = page.locator('#hot-spot');

        page.on('dialog', async dialog =>{
            expect(dialog.message()).toBe('You selected a context menu');
            await dialog.accept();
        });

        await hotspot.click({ button: 'right' });
    });

    test('4.3 hover effect', async ({ page }) =>{
         await page.goto('https://the-internet.herokuapp.com/hovers');

         const avatar = page.locator('.figure').first();
         await avatar.hover();

         //Verify to show texts after hover
         await expect(page.getByText('name: user1')).toBeVisible();
         await expect(
            page.getByRole('link', { name: 'View profile'}).first()
        ).toBeVisible();
        //  await expect(page.locator('a')).toHaveText('View profile');
    })

    test('4.4 Key Presses', async ({ page }) =>{
        await page.goto('https://the-internet.herokuapp.com/key_presses');

        const input = page.locator('#target');
        await input.click();
        await page.keyboard.press('77');
        await expect(page.locator('#result')).toHaveText('You entered: 7', { timeout: 10000 });

        await page.keyboard.press('ArrowUp');
        await expect(page.locator('#result')).toHaveText('You entered: UP', { timeout: 10000 });
    });
});

  // ============================================
  // 5. Multiole windows and iframe
  // ============================================
test.describe('Windows and iframe handle', () =>{

    test('5.1 Open new window', async ({page, context }) =>{
        await page.goto('https://the-internet.herokuapp.com/windows');

        //Listening new window
        const pagePromise = context.waitForEvent('page');
        await page.click('text = Click Here');

        const newPage = await pagePromise;
        await newPage.waitForLoadState();

        //Verification
        await expect(newPage.locator('h3')).toHaveText('New Window');

        //Close new window
         await newPage.close();
    });

    test('5.2 Nested iframe', async ({ page }) =>{
        await page.goto('https://the-internet.herokuapp.com/iframe');
        
        // Go into iframe
        const frame = page.frameLocator('#mce_0');
        const editor = frame.locator('#tinymce');

        //Clear and input content
        await editor.clear();
        await editor.fill('Playwright is awesome!');

        await expect(editor).toHaveText('Playwright is awesome!');
    });
});

  // ============================================
  // 6. Files operation
  // ============================================
  test.describe('Upload and download files', async () =>{
    test('6.1 Upload files', async ({page}) =>{
        await page.goto('https://the-internet.herokuapp.com/upload');

        //Uplaod file
        await page.locator('#file-upload').setInputFiles('./package.json');
        await page.click('#file-submit');

        //Verify
        await expect(page.locator('h3')).toHaveText('File Uploaded!');
        await expect(page.locator('#uploaded-files')).toHaveText('package.json');

    });

    test('Download files', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/download');

        const downloadPromise = page.waitForEvent('download');
        await page.click('text = random_data.txt');

        const download = await downloadPromise;

        //Save files
        const path = await download.path();
        expect(path).toBeTruthy();

        console.log(`Save the file in the path: ${path}`);

    });

  });

// ============================================
  // 7. Tables and data
// ============================================
test.describe('Tables operation', async () =>{
    test('7.1 Data table sorting', async ({ page }) =>{
         await page.goto('https://the-internet.herokuapp.com/tables');

         const table = page.locator('#table1');
         const headers = page.locator('thead tr');
         const rows = table.locator('tbody tr');

         // Verify the number of rows
         await expect(rows).toHaveCount(4);

         //Click the header for sorting
         await table.locator('th:has-text("Last Name")').click()
         const firstRow = rows.first().locator('td').first();

         //Verify
         await expect(firstRow).toHaveText('Bach');
    });

    test('7.2 Dynamic Editing', async ({ page }) =>{
        await page.goto('https://the-internet.herokuapp.com/challenging_dom');

        //Click the diffrent buttons
        const initURL = page.url();
        const firstRow = page.locator('table tbody tr').first();
        await firstRow.getByRole('link', {name: 'edit'}).click();

        //verify URL 
        await expect(page).toHaveURL(`${initURL}#edit`);
    });
});

// ============================================
  // 8. Authentication and Cookie
// ============================================
test.describe('Authentication handle', async ( ) =>{
    // clear cookies before each test
    test.beforeEach(async ({ context }) => {
        await context.clearCookies();
    });
     
    test('8.1 HTTP Basic authentication', async ({page}) =>{
        // Playwright built-in authentication
        await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');

        await expect(page.locator('p')).toContainText('Congratulations!');
    });

    test('8.2 Cookie Operation', async ({ page, context }) =>{
        await page.goto('https://the-internet.herokuapp.com/login');

        //Cookies before login
        let PreLoginCookies = await page.context().cookies();
        console.log(`The length of PreLoginCookies', ${PreLoginCookies.length}`);

        //Login
        await page.getByRole('textbox', { name: 'Username'}).fill('tomsmith');
        await page.getByRole('textbox', { name : 'password'}).fill('SuperSecretPassword!');
        await page.getByRole('button', {name: 'Login'}).click();

        // 4. Verify successful login
        await expect(page.url()).toContain('secure');

        //  There is a Cookies after login
        const postLoginCookies = await page.context().cookies();
        expect(page.locator('.flash.success')).toBeVisible();

        //Assert the existence of a cookie containing specific info (The best verify)
        const sessionCookie = postLoginCookies.find(cookie => cookie.name.includes('rack.session') 
        || cookie.name.includes('session'));

        expect(sessionCookie).toBeDefined();
        expect(sessionCookie?.value).toBeTruthy();
    });
});
// ============================================
  // 9. Performance and others
// ============================================
test.describe('Performance and advanced features', () =>{
    test('9.1 Loading page slowly', async ({ page }) =>{
        await page.goto('https://the-internet.herokuapp.com/slow');

        //waiting for loading page
        const content = page.locator('text=This page has a slow loading...');
        await expect(content).toBeVisible({timeout: 10000});
    });

    test('9.2 Infinite scrolling', async ({ page }) =>{
        await page.goto('https://the-internet.herokuapp.com/infinite_scroll');

        //Scrolling many times
        for(let i=0; i<3; i++){
            await page.evaluate(() => window.scrollBy(0, window.innerHeight));
            await page.waitForTimeout(500);
        }

        const paragraphs = page.locator('.jscroll-added');
        const count = await paragraphs.count();
        expect(count).toBeGreaterThan(0);
    });

    test('9.3 Redirect test', async ({ page }) =>{
         await page.goto('https://the-internet.herokuapp.com/redirector');

         await page.click('#redirect');
         // Waiting for redirection
         await page.waitForURL('https://the-internet.herokuapp.com/status_codes');
         await expect(page).toHaveURL(/.*status_codes/);
    });

    test('9.4 Looking for images', async ({ page }) =>{
        await page.goto('https://the-internet.herokuapp.com/broken_images');

        //Find all images
        const images = page.locator('img');
        const count = await images.count();
        console.log(`${count} images have been found`);

        //Check if all images have loaded successfully
        for(let i=0; i < count; i++){
            const img = images.nth(i);
            const naturalWidth = await img.evaluate((el:HTMLImageElement) => el.naturalWidth);
            if(naturalWidth === 0){
                console.log(`image ${i} fails to load`);
                expect(naturalWidth).toBeLessThanOrEqual(0);
            }else{
                console.log(`image ${i} loads successfully`);
                expect(naturalWidth).toBeGreaterThan(0);
            }
            
        }
    });
});
