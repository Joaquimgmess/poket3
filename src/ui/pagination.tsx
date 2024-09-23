"use client";

import { usePreviousData } from "~/hooks/usePreviusData";
import { cn } from "~/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  totalItemsCount: number;
  currentPageIndex: number;
  itensPerPage?: number;
  setCurrentPageIndex: (i: number) => void;
}

export default function Pagination({
  totalItemsCount,
  currentPageIndex,
  itensPerPage = 10,
  setCurrentPageIndex,
}: PaginationProps) {
  const page = currentPageIndex + 1;

  const previousItemsCount = usePreviousData(totalItemsCount);

  const totalCount = totalItemsCount || previousItemsCount;

  const totalPagesCount = Math.ceil(totalCount / itensPerPage);

  function handlePageChange(i: number) {
    setCurrentPageIndex(i);
  }

  const isFirstPage = page === 1;
  const isSecondPage = page === 2;
  const isLastPage = page === totalPagesCount;
  const isPenultimatePage = page === totalPagesCount - 1;
  const hasMoreThanThreePages = totalPagesCount > 3;

  if (totalPagesCount < 2) return null;

  return (
    <div className="mt-4 flex w-full items-center justify-center gap-4">
      <button
        className="text-primary hover:text-primary-light transition-colors disabled:text-neutral-400"
        disabled={isFirstPage}
        type="button"
        onClick={() => handlePageChange(currentPageIndex - 1)}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      {!isFirstPage && !isSecondPage && hasMoreThanThreePages && (
        <button
          className="text-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-white p-1"
          type="button"
          onClick={() => handlePageChange(0)}
        >
          1
        </button>
      )}
      {!isFirstPage && !isSecondPage && hasMoreThanThreePages && (
        <div className="flex h-8 w-8 items-center justify-center p-1">
          <span className="text-primary">...</span>
        </div>
      )}
      {isLastPage && totalPagesCount > 2 && (
        <button
          className="text-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-white p-1"
          type="button"
          onClick={() => handlePageChange(currentPageIndex - 2)}
        >
          {page - 2}
        </button>
      )}
      {!isFirstPage && (
        <button
          className="text-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-white p-1"
          type="button"
          onClick={() => handlePageChange(currentPageIndex - 1)}
        >
          {page - 1}
        </button>
      )}
      {
        <button
          className="bg-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm p-1 text-white"
          type="button"
        >
          {page}
        </button>
      }
      {!isLastPage && !isPenultimatePage && (
        <button
          className="text-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-white p-1"
          type="button"
          onClick={() => handlePageChange(currentPageIndex + 1)}
        >
          {page + 1}
        </button>
      )}
      {isFirstPage && hasMoreThanThreePages && (
        <button
          className="text-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-white p-1"
          type="button"
          onClick={() => handlePageChange(currentPageIndex + 2)}
        >
          {page + 2}
        </button>
      )}
      {!isLastPage && !isPenultimatePage && hasMoreThanThreePages && (
        <div className="flex h-8 w-8 items-center justify-center p-1">
          <span className="text-primary">...</span>
        </div>
      )}
      {!isLastPage && (
        <button
          className={cn(
            "text-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-white p-1",
            currentPageIndex === totalPagesCount
              ? "!bg-primary !text-white"
              : "",
          )}
          type="button"
          onClick={() => handlePageChange(totalPagesCount - 1)}
        >
          {Math.ceil(totalPagesCount)}
        </button>
      )}

      <button
        className="text-primary hover:text-primary-light transition-colors disabled:text-neutral-400"
        disabled={currentPageIndex === totalPagesCount - 1}
        type="button"
        onClick={() => handlePageChange(currentPageIndex + 1)}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
