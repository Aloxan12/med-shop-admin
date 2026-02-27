import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BrushCleaning, Pencil } from "lucide-react";

import { AppTable } from "@/shared/ui/AppTable";
import { AppFilterInput } from "@/shared/ui/AppFilterInput";

import { useGetProductsList } from "@/entities/Products/hooks/useGetProductsList.ts";
import { productsHeaderData } from "@/entities/Products/model/data.ts";
import type { ProductListDto } from "@/entities/Products/model/types.ts";
import { EditProductForm } from "@/entities/Products/ui/EditProductForm/EditProductForm.tsx";
import { RemoveProductModal } from "@/entities/Products/ui/RemoveProductModal/RemoveProductModal.tsx";

import s from "./s.module.scss";

export const ProductsTable = () => {
  const { productsList, isLoading } = useGetProductsList();
  const [searchParams] = useSearchParams();

  const [productId, setProductId] = useState<string>("");
  const [removingProduct, setRemovingProduct] = useState<ProductListDto | null>(
    null,
  );

  const searchValue = searchParams.get("search") ?? "";
  const hasSearchParam = searchParams.has("search") && searchValue !== "";

  const shouldHideTable =
    !isLoading && productsList?.results?.length === 0 && hasSearchParam;

  const preparedTableData = useMemo(() => {
    if (!productsList) return undefined;

    return {
      ...productsList,
      results: productsList.results,
    };
  }, [productsList]);

  return (
    <>
      {/*<AppFlex gap={"12"} wrap className={s.filtersRow}>*/}
      {/*  <AppDropdown*/}
      {/*    placeholder={"Сортировка"}*/}
      {/*    propsName={"label"}*/}
      {/*    propsValue={"value"}*/}
      {/*    value={sortOption}*/}
      {/*    options={productSortOptions}*/}
      {/*    onSelect={handleSortSelect}*/}
      {/*  />*/}

      {/*  <div className={s.filterInput}>*/}
      {/*    <AppInput*/}
      {/*      value={priceFrom}*/}
      {/*      onChange={setPriceFrom}*/}
      {/*      placeholder={"Цена от"}*/}
      {/*      mask={"float"}*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  <div className={s.filterInput}>*/}
      {/*    <AppInput*/}
      {/*      value={priceTo}*/}
      {/*      onChange={setPriceTo}*/}
      {/*      placeholder={"Цена до"}*/}
      {/*      mask={"float"}*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  <div>*/}
      {/*    <button type="button" className={s.cursor} onClick={clearAllFilters}>*/}
      {/*      Сбросить фильтры*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</AppFlex>*/}
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
        <div>Нет результатов по пустому поиску. Введите текст.</div>
      )}
    </>
  );
};
