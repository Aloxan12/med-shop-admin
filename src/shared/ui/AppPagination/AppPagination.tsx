import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import cls from "./AppPagination.module.css";

function createPages(
  pages: (number | string)[],
  pagesCount: number,
  currentPage: number,
) {
  if (pagesCount > 4) {
    if (currentPage > 3) {
      pages.push(1, "...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
      if (currentPage + 2 === pagesCount) {
        pages.push(pagesCount);
      }
      if (currentPage + 2 < pagesCount) {
        pages.push("...", pagesCount);
      }
    } else {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
      pages.push("...", pagesCount);
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }
}

interface IAppPagination {
  totalCount?: number;
  limit: number;
  setLimit?: (limit: number) => void;
}

export const AppPagination = ({
  // setLimit,
  limit,
  totalCount = 0,
}: IAppPagination) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const currentPage = page ? Number(page) : 1;
  const safeCurrentPage =
    Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

  // const searchParamsWithoutPagination = searchParams
  //   .toString()
  //   .replace(isPaginationResetReg, "");

  // useEffect(() => {
  //   console.log(123);
  //   setCurrentPage(1);
  // }, [limit, searchParamsWithoutPagination]);

  const pageCount = Math.ceil(totalCount / limit);
  const pages: (number | string)[] = [];

  createPages(pages, pageCount, safeCurrentPage);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);
    const lastPage = pageCount > 0 ? pageCount : 1;
    const boundedPage = safeCurrentPage > lastPage ? lastPage : safeCurrentPage;

    nextParams.set("limit", `${limit}`);
    nextParams.set("page", `${boundedPage}`);

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams.toString());
    }
  }, [limit, pageCount, safeCurrentPage, searchParams, setSearchParams]);

  // useEffect(() => {
  //   if (!!page && Number(page) !== currentPage) {
  //     setCurrentPage(Number(page));
  //   }
  // }, [currentPage, page]);

  return (
    <div className={cls.AppPaginationWrap}>
      {pages.map((page, index) => {
        return (
          <div
            key={`pagination-page-${index}`}
            className={`${cls.PaginationPage} ${safeCurrentPage === page ? cls.CurrentPage : ""}`}
            onClick={
              typeof page === "number"
                ? () => {
                    const nextParams = new URLSearchParams(searchParams);
                    nextParams.set("limit", `${limit}`);
                    nextParams.set("page", `${page}`);
                    setSearchParams(nextParams.toString());
                  }
                : undefined
            }
          >
            {page}
          </div>
        );
      })}
      {/*{setLimit && (*/}
      {/*  <AppDropdown*/}
      {/*    data={[10, 20, 30]}*/}
      {/*    value={limit}*/}
      {/*    onChange={(value) => setLimit(Number(value))}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};
