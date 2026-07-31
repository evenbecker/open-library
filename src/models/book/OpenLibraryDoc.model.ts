// A type for extracting data from the raw response of the title search API; I use it for mapping in Axios
export interface OpenLibraryDoc {
  title: string;
  author_name: string[];
  first_publish_year: number;
  cover_edition_key: string;
  cover_i: number;
  key: string;
}
