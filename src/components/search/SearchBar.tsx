// This component is what SearchContext uses to launch the appropriate search, depending on the user's selection

import { Controller, useForm } from "react-hook-form";
import { Input } from "./index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "../../context/navigation";
import { useSearch } from "../../context/search";
import { MyLogo } from "../logo";

type FormValues = {
  title: string;
  author: string;
  year: string;
  subject: string;
  language: string;
};

export const SearchBar = () => {
  type ActiveSearch = keyof typeof searchConfigs; // To be able to add the searchConfig

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      title: "",
      author: "",
      year: "",
      subject: "",
    },
  });
  const {
    fetchBooksByTitle,   
    fetchBooksByAuthor,
    fetchBooksByFirstPublishYear,
    fetchBooksBySubject,
  } = useSearch();
  const { setAllowAccess } = useNavigation();
  const [activeSearch, setActiveSearch] = useState<ActiveSearch>("title");
  const navigate = useNavigate();

  // Search type (to avoid repeating too much of TSX)
  const searchConfigs = {
    title: {
      name: "title" as const, // So TS won't complain
      label: "Title: ",
      placeholder: "Example: The Hobbit",
      fetchFn: fetchBooksByTitle,
    },
    author: {
      name: "author" as const,
      label: "Author: ",
      placeholder: "Example: J.R.R Tolkien",
      fetchFn: fetchBooksByAuthor,
    },
    year: {
      name: "year" as const,
      label: "Publish year: ",
      placeholder: "Example: 1995",
      fetchFn: fetchBooksByFirstPublishYear,
    },
    subject: {
      name: "subject" as const,
      label: "Genre: ",
      placeholder: "Example: Fantasy",
      fetchFn: fetchBooksBySubject,
    },
  };

  const config = searchConfigs[activeSearch];

  const onSubmit = (data: FormValues) => {
    // We insert the corresponding function and navigate to the ResultList
    config.fetchFn(data[config.name]);
    setAllowAccess(true);
    navigate("/books/results/result-list");
  };

  return (
    <>
      <div className="grid grid-cols-1 w-full max-w-3xl h-fit px-6 gap-8 justify-items-center items-center">
        {/* Logo  */}
        <MyLogo />

       
        <h2 className="italic">"Choose your search criteria"</h2>

        {/* “Title” is the default search term*/}
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row w-full justify-center items-center"
          >
            <Controller
              name={config.name}
              control={control}
              rules={{ required: `${config.name} is required` }}
              render={({ field, fieldState }) => (
                <Input
                  value={field.value}
                  name={config.name}
                  className="min-w-[300px] border border-[var(--border-gray-even)] rounded-lg h-11 px-3"
                  placeholder={config.placeholder}
                  required={true}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.error?.message}
                />
              )}
            />

          
            <div className="flex w-fit px-3 py-2 gap-2">
              <button
                type="submit"
                className="cursor-pointer border border-[var(--border-gray-even)] bg-amber-300 rounded-lg px-4 py-2 text-sm"
              >
                Search
              </button>
            
            </div>
          </form>
        </div>

        {/* Buttons to open different searches */}
        <div className="grid grid-cols-[140px_140px] gap-3">
          <button
            className="text-xs cursor-pointer border border-[var(--border-gray-even)] rounded-lg px-4 py-2"
            onClick={() => setActiveSearch("title")}
          >
            Search by title
          </button>
          <button
            className="text-xs cursor-pointer border border-[var(--border-gray-even)] rounded-lg px-4 py-2"
            onClick={() => setActiveSearch("author")}
          >
            Search by author
          </button>
          <button
            className="text-xs cursor-pointer border border-[var(--border-gray-even)] rounded-lg not-[]:px-4 py-2"
            onClick={() => setActiveSearch("year")}
          >
            Search by publish year
          </button>
          <button
            className="text-xs cursor-pointer border border-[var(--border-gray-even)] rounded-lg px-4 py-2"
            onClick={() => setActiveSearch("subject")}
          >
            Search by genre
          </button>
        </div>
      </div>
    </>
  );
};
