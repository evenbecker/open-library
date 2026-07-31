import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "../NotFound";

interface Props {
  children: ReactNode;
}

export const BrokenRouteAvoider = ({ children }: Props) => {
  return (
    <>
      <Routes>
        {children}
        <Route path="*" element={<Navigate to="/search" replace />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </>
  );
};
