<script>
    import {browser} from '$app/environment'
    import {QueryClient, QueryClientProvider} from '@tanstack/svelte-query'

    import Footer from "$lib/Footer.svelte";
    import Header from "$lib/Header.svelte";
    import Top from "$lib/Top.svelte";

    import "../app.css";

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                enabled: browser,
            },
        },
    })
</script>

<QueryClientProvider client={queryClient}>
    <Header/>
    <main class="min-h-screen m-5">
        <div class="container mx-auto">
            <div class="relative w-full md:w-10/12 lg:w-6/12 mt-8 mb-1 lg:mt-10 lg:mb-2 mx-auto">
                <slot/>
                <Top/>
            </div>
        </div>
    </main>
    <Footer/>
</QueryClientProvider>

<style lang="postcss">
    :global(html) {
        background-color: theme("colors.black");
        color: theme("colors.green.500");
    }
</style>
