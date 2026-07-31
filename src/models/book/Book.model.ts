// Here's what I put together using the search response in Axios. This is what's served to the components via `useFetch`.

import type { OpenLibraryDoc } from "./OpenLibraryDoc.model";

export interface Book {
  book_details: OpenLibraryDoc;
  cover_size: string;
  cover_image: string;
}
