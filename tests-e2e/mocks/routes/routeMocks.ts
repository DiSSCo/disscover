/* Import dependencies */
import { Page } from '@playwright/test';

/* Import mock data */
import { mockVirtualCollectionsData } from '../data/mockVirtualCollections';
import { mockVirtualCollectionDetails } from '../data/mockVirtualCollectionDetails';
import { mockSelectedVirtualCollection } from '../data/mockSelectedVirtualCollection';

/* Route mock for the getVirtualCollections service that fulfills the request with a mocked virtualCollections data */
export async function mockGetVirtualCollections(page: Page) {
    await page.route('**/virtual-collection/v1', async (route) => {
        if(route.request().method() === 'GET') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockVirtualCollectionsData)
            })
        } else {
            await route.continue();
        }
    })
}

/* Route mock for the getVirtualCollectionDetails service that fulfills the request with a mocked virtualCollectionDetails data */
export async function mockGetVirtualCollectionDetails(page: Page) {
    await page.route('**/digital-specimen/v1/search?virtualCollectionID=https://hdl.handle.net/TEST/809-ZZH-QC2&pageSize=25&pageNumber=1', async (route) => {
        if(route.request().method() === 'GET') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockVirtualCollectionDetails)
            })
        } else {
            await route.continue();
        }
    })
}

/* Route mock for the getSelectedVirtualCollection service that fulfills the request with a mocked selectedVirtualCollections data */
export async function mockGetSelectedVirtualCollection(page: Page) {
    await page.route('**/virtual-collection/v1/TEST/809-ZZH-QC2', async (route) => {
        if(route.request().method() === 'GET') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockSelectedVirtualCollection)
            })
        } else {
            await route.continue();
        }
    })
}