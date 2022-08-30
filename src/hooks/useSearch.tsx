import React, { useState } from 'react';
import { ISearch } from 'src/definitions/ISearch';

// this should return an array of searched item data and take data, searchInput as input
const useSearch = ({ data, searchValue }: ISearch) => {
  const search = () => {
    data.filter((item) => {
      return item.job_title === searchValue.toLowerCase();
    });
  };

  // console.log(search);
};

export default useSearch;
