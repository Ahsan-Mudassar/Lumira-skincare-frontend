import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
                if (error?.status >= 400 && error?.status < 500) return false;
                return failureCount < 2;
            },
        },
        mutations: {
            retry: false,
        }
    }
});