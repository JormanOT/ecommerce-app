import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId : process.env.NEXT_PUBLIC_SANITY_ID,
    dataset : process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion : '2022-11-15',
    useCdn : true,
    token : process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source)=> builder.image(source)