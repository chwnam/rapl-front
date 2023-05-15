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
            <slot/>
        </div>
    </main>
    <Footer/>
    <Top/>
</QueryClientProvider>

<style lang="postcss">
    :global(html) {
        background-color: theme("colors.black");
        color: theme("colors.green.500");
    }
</style>
