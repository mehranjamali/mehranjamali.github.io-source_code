import _ from "lodash";

function paginate(items: any, pageNumber: number, pageSize: number) {
   const startIndex = (pageNumber - 1) * pageSize;
   return _(items).slice(startIndex).take(pageSize).value();
}

export { paginate };
