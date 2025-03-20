import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../utils/globals";


// const PAGE_SIZE = 10;
type PaginationProps = {
    count: number
}

function Pagination({ count }: PaginationProps) {

    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    const pageCount = Math.ceil(count / PAGE_SIZE);

    const nextPage = () => {
        const next = currentPage === pageCount ? currentPage : currentPage + 1;

        searchParams.set("page", next + "");
        setSearchParams(searchParams);
    };

    const prevPage = () => {
        const prev = currentPage === 1 ? currentPage : currentPage - 1;

        searchParams.set("page", prev + "");
        setSearchParams(searchParams);

    };
    
    if (pageCount <= 1) return null;

    return (
        <div className="w-full flex items-center justify-between">
            <p>
                Showing <span> {(currentPage - 1) * PAGE_SIZE + 1} </span>
                to <span> {currentPage === pageCount ? count : currentPage * PAGE_SIZE} </span>
                of <span> {count} </span>
                results
            </p>

            <div className="flex gap-[0.6rem]">
                <button className="cursor-pointer disabled:bg-transparent disabled:cursor-not-allowed rounded-md h-[34px] flex items-center focus:outline-none hover:bg-gray-200 focus:ring-[0.05rem] focus:ring-gray-300 text-[0.95rem] gap-2 font-normal pl-1 pr-3  " onClick={prevPage} disabled={currentPage === 1}>
                    <HiChevronLeft className="text-lg"/><span>Previous</span>
                </button>

                <button className="cursor-pointer disabled:bg-transparent disabled:cursor-not-allowed rounded-md h-[34px] flex items-center focus:outline-none hover:bg-gray-200 focus:ring-[0.05rem] focus:ring-gray-300 text-[0.95rem] gap-2 font-normal pl-3 pr-1 " onClick={nextPage} disabled={currentPage === pageCount}>
                    <span>Next</span><HiChevronRight className="text-lg"/>
                </button>
            </div>
        </div>
    );
}

export default Pagination;