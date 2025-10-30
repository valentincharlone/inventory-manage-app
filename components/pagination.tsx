"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface InventoryPaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams: Record<string, string>;
}

export function InventoryPagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams,
}: InventoryPaginationProps) {
  const router = useRouter();

  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams({ ...searchParams, page: String(page) });
    return `${baseUrl}?${params.toString()}`;
  };

  const handlePageChange = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(getPageUrl(page), { scroll: false });
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage <= 1 ? "#" : getPageUrl(currentPage - 1)}
            onClick={
              currentPage <= 1
                ? undefined
                : (e) => handlePageChange(currentPage - 1, e)
            }
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const pageNumber = page as number;
          const isCurrentPage = pageNumber === currentPage;

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={getPageUrl(pageNumber)}
                onClick={(e) => handlePageChange(pageNumber, e)}
                isActive={isCurrentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={currentPage >= totalPages ? "#" : getPageUrl(currentPage + 1)}
            onClick={
              currentPage >= totalPages
                ? undefined
                : (e) => handlePageChange(currentPage + 1, e)
            }
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
