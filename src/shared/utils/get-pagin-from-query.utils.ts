export type PagingQuery = {
  perPage: string;
  page: string;
};

export const getPaging = (data: PagingQuery) => {
  const page = +data.page || 1;
  const take = +data.perPage || 30;
  const skip = (page - 1) * take;

  return { take, skip };
};
