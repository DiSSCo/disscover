import AxeBuilder from "@axe-core/playwright";

/**
 * This utility function logs a console.error if any violations in the A11Y scan are found
 * @param accessibilityScanResults The results of the A11Y scan with potential violations
 * @param pageName Name of the page for logging purposes
 */
export const logAxeViolations = (accessibilityScanResults: any, pageName: string) => {
    if (accessibilityScanResults.violations.length > 0) {
        console.error(`Accessibility Violations ${pageName}:`, accessibilityScanResults.violations);
    }
}

/**
 * This utility function scans a page with the AxeBuilder to check for A11y violations
 * @param page The page to be scanned by Axe
 * @param pageName Name of the page for logging purposes
 * @param options optional Option to include or exclude specific parts of a page 
 * @returns 
 */
export async function checkA11y(page: any, pageName: string, options?: any) {
    const builder = new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']);
    
    if (options?.include) builder.include(options.include);
    if (options?.exclude) builder.exclude(options.exclude);
  
    const results = await builder.analyze();
    
    if (results.violations.length > 0) {
      logAxeViolations(results, pageName);
    }

    return results.violations;
  }