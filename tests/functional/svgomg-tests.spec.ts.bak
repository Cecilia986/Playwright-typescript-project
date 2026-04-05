import { test, expect } from '@playwright/test';

test.describe('SVGOMG Website Functional Tests', () => {
  
  // Test SVG content (a simple circle)
  const testSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="red" stroke="black" stroke-width="2"/>
  </svg>`;

  test.beforeEach(async ({ page }) => {
    // Navigate to SVGOMG page before each test
    await page.goto('https://demo.playwright.dev/svgomg/');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  // ============================================
  // Test Case 1: Verify page basic elements
  // ============================================
  test('1. Verify page title and core elements exist', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/SVGOMG/);
    
    // Verify main buttons exist
    await expect(page.getByRole('button', { name: 'Open SVG' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Paste markup' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Download' })).toBeVisible();
    
    // Verify SVGO version info exists
    const versionText = page.locator('text=Powered by SVGO');
    await expect(versionText).toBeVisible();
  });

  // ============================================
  // Test Case 2: Optimize SVG by pasting code
  // ============================================
  test('2. Paste SVG code and verify optimization result', async ({ page }) => {
    // Click "Paste markup" button
    await page.getByRole('button', { name: 'Paste markup' }).click();
    
    // Wait for editor to appear and paste SVG code
    const editor = page.locator('textarea');
    await editor.fill(testSvg);
    
    // Click "Optimize!" or wait for auto-optimization
    const optimizeButton = page.getByRole('button', { name: /Optimize/i });
    if (await optimizeButton.isVisible()) {
      await optimizeButton.click();
    }
    
    // Wait for optimization to complete
    await page.waitForTimeout(1000);
    
    // Verify output area has content
    const outputArea = page.locator('pre');
    await expect(outputArea).toBeVisible();
    
    // Verify output is valid SVG
    const outputText = await outputArea.textContent();
    expect(outputText).toContain('<svg');
    expect(outputText).toContain('xmlns');
    
    // Verify optimized file size is less than or equal to original
    const inputSize = testSvg.length;
    const outputSize = outputText?.length || inputSize;
    expect(outputSize).toBeLessThanOrEqual(inputSize);
    
    console.log(`✅ Before optimization: ${inputSize} chars, After optimization: ${outputSize} chars`);
  });

  // ============================================
  // Test Case 3: Test optimization configuration options
  // ============================================
  test('3. Test different optimization options', async ({ page }) => {
    // Paste SVG
    await page.getByRole('button', { name: 'Paste markup' }).click();
    await page.locator('textarea').fill(testSvg);
    
    // Expand advanced options (if any)
    const advancedToggle = page.locator('text=Advanced options');
    if (await advancedToggle.isVisible()) {
      await advancedToggle.click();
    }
    
    // Test various optimization options
    const options = [
      { name: 'Remove title', selector: 'text=Remove title' },
      { name: 'Remove desc', selector: 'text=Remove desc' },
      { name: 'Collapse useless groups', selector: 'text=Collapse useless groups' }
    ];
    
    for (const option of options) {
      const checkbox = page.locator(option.selector);
      if (await checkbox.isVisible()) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
      }
    }
    
    // Trigger optimization
    const optimizeButton = page.getByRole('button', { name: /Optimize/i });
    if (await optimizeButton.isVisible()) {
      await optimizeButton.click();
    }
    
    // Wait for results
    await page.waitForTimeout(1000);
    
    // Verify optimization results exist
    const outputArea = page.locator('pre');
    await expect(outputArea).toBeVisible();
    
    console.log('✅ All optimization options tested');
  });

  // ============================================
  // Test Case 4: Download optimized SVG
  // ============================================
  test('4. Download optimized SVG file', async ({ page }) => {
    // Set up download listener
    const downloadPromise = page.waitForEvent('download');
    
    // Paste SVG
    await page.getByRole('button', { name: 'Paste markup' }).click();
    await page.locator('textarea').fill(testSvg);
    
    // Wait for optimization
    const optimizeButton = page.getByRole('button', { name: /Optimize/i });
    if (await optimizeButton.isVisible()) {
      await optimizeButton.click();
    }
    
    await page.waitForTimeout(1000);
    
    // Click download button
    await page.getByRole('button', { name: 'Download' }).click();
    
    // Wait for download to start
    const download = await downloadPromise;
    
    // Verify downloaded file name
    expect(download.suggestedFilename()).toContain('.svg');
    
    // Optional: Save file locally
    await download.saveAs(`./test-results/downloaded-${Date.now()}.svg`);
    
    console.log(`✅ File downloaded successfully: ${download.suggestedFilename()}`);
  });

  // ============================================
  // Test Case 5: Invalid SVG error handling
  // ============================================
  test('5. Handle invalid SVG input', async ({ page }) => {
    const invalidSvg = `<html><body>This is not an SVG</body></html>`;
    
    // Paste invalid content
    await page.getByRole('button', { name: 'Paste markup' }).click();
    await page.locator('textarea').fill(invalidSvg);
    
    // Trigger optimization
    const optimizeButton = page.getByRole('button', { name: /Optimize/i });
    if (await optimizeButton.isVisible()) {
      await optimizeButton.click();
    }
    
    // Wait and verify error message (if any)
    await page.waitForTimeout(1000);
    
    // Verify output area has no valid SVG
    const outputArea = page.locator('pre');
    const outputText = await outputArea.textContent();
    
    // Output should not contain valid SVG structure, or should show error message
    const hasValidSvg = outputText?.includes('<svg') && outputText?.includes('xmlns');
    expect(hasValidSvg).toBeFalsy();
    
    console.log('✅ Invalid input handled correctly');
  });

  // ============================================
  // Test Case 6: Clear and reset functionality
  // ============================================
  test('6. Clear input and start over', async ({ page }) => {
    // Paste SVG
    await page.getByRole('button', { name: 'Paste markup' }).click();
    await page.locator('textarea').fill(testSvg);
    
    // Verify input area has content
    const editor = page.locator('textarea');
    await expect(editor).not.toHaveValue('');
    
    // Clear content
    await editor.fill('');
    
    // Verify input area is empty
    await expect(editor).toHaveValue('');
    
    // Re-paste valid SVG
    await editor.fill(testSvg);
    await expect(editor).not.toHaveValue('');
    
    console.log('✅ Clear and reset functionality works correctly');
  });
});