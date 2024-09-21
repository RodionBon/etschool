import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { ReactElement } from "react";

interface Props {
	currentPage: number;
	pagesCount: number;
}

const CardsPagination = (props: Props) => {
	const canAccessNext = props.currentPage < props.pagesCount - 1;
	const canAccessPrev = props.currentPage > 0;
	let paginationItems: ReactElement[] = [];
	if (props.pagesCount < 7) {
		for (let i = 0; i < props.pagesCount; i++) {
			paginationItems.push(
				<PaginationItem key={i}>
					<PaginationLink href={`${i}`}>{i + 1}</PaginationLink>
				</PaginationItem>
			);
		}
	} else {
		for (let i = 0; i < 3; i++) {
			paginationItems.push(
				<PaginationItem key={i}>
					<PaginationLink href={`${i}`}>{i + 1}</PaginationLink>
				</PaginationItem>
			);
		}
		paginationItems.push(
			<PaginationItem>
				<PaginationEllipsis></PaginationEllipsis>
			</PaginationItem>
		);
		for (let i = props.pagesCount - 3; i < props.pagesCount; i++) {
			paginationItems.push(
				<PaginationItem key={i}>
					<PaginationLink href={`${i}`}>{i + 1}</PaginationLink>
				</PaginationItem>
			);
		}
	}

	return (
		<>
			<Pagination>
				<PaginationContent>
					{canAccessPrev && (
						<PaginationItem>
							<PaginationPrevious
								href={`${props.currentPage - 1}`}
							/>
						</PaginationItem>
					)}
					{paginationItems}
					{canAccessNext && (
						<PaginationItem>
							<PaginationNext href={`${props.currentPage + 1}`} />
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</>
	);
};
export default CardsPagination;
