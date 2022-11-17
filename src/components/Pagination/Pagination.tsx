import { Box, Icon, Stack } from '@chakra-ui/react';
import React from 'react';
import { usePagination, DOTS } from 'src/lib/hooks/usePagination';
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs';
import { IPagination } from '@/interfaces/pagination.interface';
{
  /*
   * @params
   * totalCount - represents the total count of data available from the source.
   * currentPage - represents the current active page. We'll use a 1-based index instead of a traditional 0-based index for our currentPage value.
   * pageSize - represents the maximum data that is visible in a single page.
   * onPageChange - callback function invoked with the updated page value when the page is changed.
   * siblingCount (optional): represents the min number of page buttons to be shown on each side of the current page button. Defaults to 1.
   */
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount,
  currentPage,
  pageSize,
}: IPagination) => {
  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  // let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <Stack direction={'row'} alignItems="center">
      <Box pt="0.3rem" as="button" onClick={onPrevious}>
        <Icon
          w={['1.5rem', '2rem']}
          h={['1.5rem', '2rem']}
          as={BsArrowLeftShort}
        />
      </Box>
      {paginationRange?.map(
        (
          pageNumber:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | React.ReactFragment
            | null
            | undefined,
          key: number
        ) => {
          if (pageNumber === DOTS) {
            return <Box key={'icon'}>&#8230;</Box>;
          }
          return (
            <Box
              p="0.4rem"
              as="button"
              fontSize={{ base: '12px', sm: 'sm', md: 'lg' }}
              key={key}
              fontWeight={currentPage === pageNumber ? '800' : '500'}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Box>
          );
        }
      )}
      <Box pt="0.3rem" as="button" onClick={onNext}>
        <Icon
          w={['1.5rem', '2rem']}
          h={['1.5rem', '2rem']}
          as={BsArrowRightShort}
        />
      </Box>
    </Stack>
  );
};

export default Pagination;
