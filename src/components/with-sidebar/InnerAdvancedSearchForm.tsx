import { Controller, useForm } from "react-hook-form";
import { Input } from "../search";
import type { AdvancedSearchParams } from "../../models/search";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";

type FormValues = {
  title?: string;
  author?: string;
  year?: string;
  subject?: string;
  language?: string;
};

export const InnerAdvancedSearchForm = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      author: "",
      year: "",
      subject: "",
      language: "",
    },
  });

  const { fetchAdvancedSearch } = useSearch();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    // If the user hasn't filled in at least one field, we won't let them search
    const inputValues = Object.values(data);
    const hasFilledAtLeastOneField = inputValues.some((value) => value && value.trim() !== "");

    if (!hasFilledAtLeastOneField) {
      alert("Please fill in at least one field to search");
      return;
    }

    const searchParams: AdvancedSearchParams = {
      title: data.title || undefined,
      author: data.author || undefined,
      year: data.year || undefined,
      subject: data.subject || undefined,
      language: data.language || undefined,
    };

    fetchAdvancedSearch(searchParams);
    navigate("/books/results/result-list");
  };

  return (
    <div className="text-center w-fit mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Title: "
              value={field.value}
              name="title"
              className="w-full px-2 border border-[var(--border-gray-even)] rounded-lg h-5 text-xs focus:border-2 focus:border-orange-600 focus:outline-none focus:ring-0"
              placeholder="Example: The Hobbit"
              required={false}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Author */}
        <Controller
          name="author"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Author: "
              value={field.value}
              name="author"
              className="w-full px-2 border border-[var(--border-gray-even)] rounded-lg h-5 text-xs focus:border-2 focus:border-orange-600 focus:outline-none focus:ring-0"
              placeholder="Example: J.R.R Tolkien"
              required={false}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Year */}
        <Controller
          name="year"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Year: "
              value={field.value}
              name="year"
              className="w-full px-2 border border-[var(--border-gray-even)] rounded-lg h-5 text-xs focus:border-2 focus:border-orange-600 focus:outline-none focus:ring-0"
              required={false}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Subject */}
        <Controller
          name="subject"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Genre: "
              value={field.value}
              name="subject"
              className="w-full px-2 border border-[var(--border-gray-even)] rounded-lg h-5 text-xs focus:border-2 focus:border-orange-600 focus:outline-none focus:ring-0"
              required={false}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Language */}
        <Controller
          name="language"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Language: "
              value={field.value}
              name="language"
              className="w-full px-2 border border-[var(--border-gray-even)] rounded-lg h-5 text-xs focus:border-2 focus:border-orange-600 focus:outline-none focus:ring-0"
              required={false}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <div className="py-0.5">
          <button
            type="submit"
            className="cursor-pointer border border-[var(--border-gray-even)] bg-amber-300 rounded-lg px-4 py-0.5 mt-2 text-sm"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
