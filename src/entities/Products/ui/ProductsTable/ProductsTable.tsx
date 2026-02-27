import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BrushCleaning, Pencil } from "lucide-react";

import { AppTable } from "@/shared/ui/AppTable";
import { AppFilterInput } from "@/shared/ui/AppFilterInput";
import { AppDropdown } from "@/shared/ui/AppDropDown/AppDropDown.tsx";
import { AppInput } from "@/shared/ui/AppInput";
import { AppFlex } from "@/shared/ui/AppFlex";
import { useDebounce } from "@/shared/lib/hooks/useDebounce.ts";

import { useGetProductsList } from "@/entities/Products/hooks/useGetProductsList.ts";
import {
  productSortOptions,
  productsHeaderData,
} from "@/entities/Products/model/data.ts";
import type {
  ProductListDto,
  SortOption,
} from "@/entities/Products/model/types.ts";
import { EditProductForm } from "@/entities/Products/ui/EditProductForm/EditProductForm.tsx";
import { RemoveProductModal } from "@/entities/Products/ui/RemoveProductModal/RemoveProductModal.tsx";

import s from "./s.module.scss";

const getSortOption = (sortValue: string | null): SortOption | null => {
  if (!sortValue) return null;
  return (
    productSortOptions.find((option) => option.value === sortValue) || null
  );
};

export const ProductsTable = () => {
  const { productsList, isLoading } = useGetProductsList();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsString = searchParams.toString();

  const [productId, setProductId] = useState<string>("");
  const [removingProduct, setRemovingProduct] = useState<ProductListDto | null>(
    null,
  );

  const [sortOption, setSortOption] = useState<SortOption | null>(() =>
    getSortOption(searchParams.get("sort")),
  );
  const [priceFrom, setPriceFrom] = useState(
    searchParams.get("priceFrom") || "",
  );
  const [priceTo, setPriceTo] = useState(searchParams.get("priceTo") || "");

  const debouncedPriceFrom = useDebounce(priceFrom);
  const debouncedPriceTo = useDebounce(priceTo);

  const searchValue = searchParams.get("search") ?? "";
  const hasSearchParam = searchParams.has("search") && searchValue !== "";
  const hasPriceFilter = !!debouncedPriceFrom || !!debouncedPriceTo;

  const shouldHideTable =
    !isLoading &&
    productsList?.results?.length === 0 &&
    (hasSearchParam || hasPriceFilter);

  useEffect(() => {
    const sortFromUrl = searchParams.get("sort");
    const fromFromUrl = searchParams.get("priceFrom") || "";
    const toFromUrl = searchParams.get("priceTo") || "";

    setSortOption(getSortOption(sortFromUrl));
    setPriceFrom(fromFromUrl);
    setPriceTo(toFromUrl);
  }, [searchParams, searchParamsString]);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);

    if (debouncedPriceFrom) {
      nextParams.set("priceFrom", debouncedPriceFrom);
    } else {
      nextParams.delete("priceFrom");
    }

    if (debouncedPriceTo) {
      nextParams.set("priceTo", debouncedPriceTo);
    } else {
      nextParams.delete("priceTo");
    }

    nextParams.set("page", "1");

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams.toString());
    }
  }, [debouncedPriceFrom, debouncedPriceTo, searchParams, setSearchParams]);

  const handleSortSelect = (option: SortOption) => {
    setSortOption(option);
    const nextParams = new URLSearchParams(searchParams);

    if (option?.value) {
      nextParams.set("sort", option.value);
    } else {
      nextParams.delete("sort");
    }

    nextParams.set("page", "1");
    setSearchParams(nextParams.toString());
  };

  const clearAllFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("sort");
    nextParams.delete("priceFrom");
    nextParams.delete("priceTo");
    nextParams.delete("search");
    nextParams.set("page", "1");
    setSortOption(null);
    setPriceFrom("");
    setPriceTo("");
    setSearchParams(nextParams.toString());
  };

  const preparedTableData = useMemo(() => {
    if (!productsList) return undefined;

    return {
      ...productsList,
      results: productsList.results,
    };
  }, [productsList]);

  return (
    <>
      {productId && (
        <EditProductForm
          closeModal={() => setProductId("")}
          modalTitle={"Редактировать товар"}
          productId={productId}
        />
      )}
      {removingProduct && (
        <RemoveProductModal
          closeModal={() => setRemovingProduct(null)}
          product={removingProduct}
        />
      )}

      <AppFilterInput
        placeholder={"Search by product name"}
        searchParam={"search"}
      />

      <AppFlex gap={"12"} wrap className={s.filtersRow}>
        <AppDropdown
          placeholder={"Сортировка"}
          propsName={"label"}
          propsValue={"value"}
          value={sortOption}
          options={productSortOptions}
          onSelect={handleSortSelect}
        />

        <div className={s.filterInput}>
          <AppInput
            value={priceFrom}
            onChange={setPriceFrom}
            placeholder={"Цена от"}
            mask={"float"}
          />
        </div>

        <div className={s.filterInput}>
          <AppInput
            value={priceTo}
            onChange={setPriceTo}
            placeholder={"Цена до"}
            mask={"float"}
          />
        </div>

        <div>
          <button type="button" className={s.cursor} onClick={clearAllFilters}>
            Сбросить фильтры
          </button>
        </div>
      </AppFlex>

      {!shouldHideTable && (
        <AppTable
          headerData={productsHeaderData}
          isLoading={isLoading}
          data={preparedTableData}
          tableDataSelectors={[
            { name: "id" },
            { name: "name" },
            {
              renderItem: (item) => (
                <div className={s.photoCell}>
                  {item.photo ? (
                    <>
                      <img
                        src={item.photo}
                        alt={item.name}
                        className={s.photoThumb}
                      />
                      <a
                        href={item.photo}
                        target="_blank"
                        rel="noreferrer"
                        className={s.photoLink}
                      >
                        open
                      </a>
                    </>
                  ) : (
                    <div>-</div>
                  )}
                </div>
              ),
            },
            {
              renderItem: (item) => <div>{item.price}</div>,
            },
            {
              renderItem: (item) => <div>{item.stock}</div>,
            },
            {
              renderItem: (item) => <div>{item.popularity}</div>,
            },
            {
              renderItem: (item) => (
                <div>{item.isActive ? "active" : "inactive"}</div>
              ),
            },
            {
              renderItem: (item) => (
                <div>
                  {item.categories?.length
                    ? item.categories
                        .map((category) => category.name)
                        .join(", ")
                    : "-"}
                </div>
              ),
            },
            {
              renderItem: (item) => (
                <div className={s.actions}>
                  <Pencil
                    size={"20"}
                    color={"blue"}
                    className={s.cursor}
                    onClick={() => setProductId(item.id)}
                  />
                  <BrushCleaning
                    size={"20"}
                    color={"red"}
                    className={s.cursor}
                    onClick={() => setRemovingProduct(item)}
                  />
                </div>
              ),
            },
          ]}
        />
      )}

      {shouldHideTable && (
        <div>Нет результатов по выбранным параметрам. Уточните фильтры.</div>
      )}
    </>
  );
};
