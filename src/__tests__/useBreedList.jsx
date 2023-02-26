import { expect, test } from "vitest";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../useBreedList";

// Testing custom hooks is a bit of a trick because they are inherently tied to the internal workings of 
// React: they can't be called outside of a component. 
// So how we do we get around that? We fake a component

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            // We're giving it a retry: false key-value pair because we want it to fail fast instead of retrying.
            retry: false,
        }
    }
});

// This is the test for the useBreedList hook. It's a bit more complicated than the test for the
// Carousel component because we have to mock the fetchBreedList function. We do that by using the
// jest.mock function. We also have to make sure that the queryClient is wrapped around the component
// that we're testing.
test("gives an emnpty list with no animal", async () => {
    // We're using the renderHook function from the @testing-library/react package to render the hook.
    // We're also passing in a wrapper function that wraps the component that we're testing with the
    // queryClient.
    const { result } = renderHook(() => useBreedList(""), {
        wrapper: ({ children }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        )
    })
    // We're using the destructuring assignment to get the breedList and status variables from the
    // result object.
    const [breedList, status] = result.current;
    // We're using the toHaveLength matcher to make sure that the breedList is empty.
    // We're also using the toBe matcher to make sure that the status is "loading".
    expect(breedList).toHaveLength(0);
    expect(status).toBe("loading");
});