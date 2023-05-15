<script>
import {page as storesPage} from "$app/stores";
import Pagination from "$lib/Pagination.svelte";
</script>

<svelte:head>
    <title>Metal Radio Playlist Artist Info: In Flames</title>
</svelte:head>

<div class="w-full md:w-10/12 lg:w-6/12 mt-8 lg:mt-10 mb-2 mx-auto">
    <h2 class="font-bold text-xl mb-2">Artist Information</h2>
    <ul id="artist-info" class="grow-1 leading-6 md:leading-7">
        <li>
            <span class="label">Artist Name</span>
            In Flames
        </li>
        <li>
            <span class="label">Total Tracks</span>
            22
        </li>
        <li>
            <span class="label">Play count</span>
            45
        </li>
        <li class="text-right">
            <a href="../../" class="text-sm text-green-300">&laquo; Back to Main</a>
        </li>
    </ul>

    <h3 class="font-bold text-lg mt-8">Fetched Songs</h3>
    <ul class="mt-2 md:pl-4 w-full mb-5">
        <li class="border border-x-0 border-t-0 border-dashed border-green-500 pt-4 pb-2.5">
            <div class="flex flex-row">
                <div class="min-w-[64px] mr-4">
                    <img src="https://cdn-images.audioaddict.com/2/4/5/a/1/6/245a16312be2bc5a6dca517ea1a2d9ae.jpg?width=128&height=128&quality=low"
                         class="float-left w-[64px] h-[64px]"
                         alt="Cover of the track"
                    />
                </div>
                <div class="w-full">
                    <h4 class="text-lg">The title of the track</h4>
                    <div class="text-sm">Play count: 3</div>
                </div>
            </div>
        </li>
        <li class="border border-x-0 border-t-0 border-dashed border-green-500 pt-4 pb-2.5">
            <div class="flex flex-row">
                <div class="min-w-[64px] mr-4">
                    <img src="https://cdn-images.audioaddict.com/2/4/5/a/1/6/245a16312be2bc5a6dca517ea1a2d9ae.jpg?width=128&height=128&quality=low"
                         class="float-left w-[64px] h-[64px]"
                         alt="Cover of the track"
                    />
                </div>
                <div class="w-full">
                    <h4 class="text-lg">The title of the track</h4>
                    <div class="text-sm">Play count: 3</div>
                </div>
            </div>
        </li>
    </ul>

    <!-- Pagination -->
    <div class="w-full text-center">
        <Pagination
                params={$storesPage.data}
                totalPages={10}
        />
    </div>
</div>

<style>
    #artist-info span.label {
        display: inline-block;
        font-weight: 600;
        min-width: 8rem;
    }
</style>
