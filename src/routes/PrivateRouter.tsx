import { Route } from "react-router-dom";
import { MyLayout } from "../pages/layouts/MyLayout";
import { BrokenRouteAvoider } from "./routes-utils";
import { BookDetailsPage, FavoritesPage, ResultListPage, SingleResultPage } from "../pages/pages";

export const PrivateRouter = () => {
  return (
    <BrokenRouteAvoider>
      <Route path="results/" element={<MyLayout />}>
        <Route path="result-list" element={<ResultListPage />} />
        <Route path="book" element={<SingleResultPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="book-detail" element={<BookDetailsPage />} />
      </Route>
    </BrokenRouteAvoider>
  );
};
