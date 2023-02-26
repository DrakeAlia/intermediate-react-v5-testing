import { expect, test } from 'vitest';
import { render } from '@testing-library/react'
import { StaticRouter } from 'react-router-dom/server'
import Pet from '../Pet';

// You get a report from a user saying that I have broken images on your homepage for pets that don't have images
// So with this test I can go find and fix it and gurentee that I know I have fixed it
// And leave this to my testing suite to make sure that it doesn't break again

// This is the standard test method
test("displays a default thumbnail", async () => {
    const pet = render(
        <StaticRouter>
            <Pet />
        </StaticRouter>
    );

    const petThumbnail = await pet.findByTestId("thumbnail");
    // this is the same as:
    // expect(petThumbnail.src).toBe("http://localhost/none.jpg")
    // but it's more flexible
    expect(petThumbnail.src).toContain("none.jpg")
    pet.unmount()
})

test("displays a non-default thumbnail", async () => {
    const pet = render(
        <StaticRouter>
            <Pet images={["1.jpg", "2.jpg", "3.jpg"]} />
        </StaticRouter>
    );
    const petThumbnail = await pet.findByTestId("thumbnail");
    expect(petThumbnail.src).toContain("1.jpg")
    pet.unmount()
})
