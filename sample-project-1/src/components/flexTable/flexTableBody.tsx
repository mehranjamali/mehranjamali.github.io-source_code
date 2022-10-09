import { columnsType, childType } from "./flexTableType";
import _ from "lodash";
import FlexTable from "./flexTable";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

type propsType = {
   data: any;
   columns: columnsType[];
   child?: childType;
   parent?: any;
   tableName: string;
   childTableName?: string;
};

function FlexTableBody({ columns, data, child, tableName, childTableName, parent }: propsType) {
   // Create Key
   const createKey = (item: any, column: columnsType, index: number): string => {
      return item.id + index + tableName + (column.path || column.basis);
   };
   // Render Cell
   const renderCell = (item: any, column: columnsType): any => {
      if (column?.content) return column.content(item, parent);
      return _.get(item, column.path);
   };
   // Create Unique Id
   const createUniqueId = (item: any, tableName: string) => {
      return item.id + tableName;
   };
   // Generate Table Name
   const generateTableName = () => {
      return childTableName ? childTableName : `childTable-${tableName}`;
   };

   // Toggle Child Table
   const toggleChildTable = (id: string, event: any) => {
      const childTable = document.getElementById(id);
      childTable?.classList.toggle("hide-child-table");
      event.currentTarget.classList.toggle("rotate-90");
   };

   return (
      <div data-name="flex-table-body" className="">
         {data.map((item: any, index: number) => {
            return (
               <div
                  data-name="block"
                  key={`${index}-${item.id}`}
                  className="flex flex-col border-b last:border-none border-slate-300 dark:border-slate-500 overflow-y-hidden"
               >
                  <div data-name="row" className="relative flex md:flex-row justify-between items-center py-2 pt-2.5">
                     {child?.path &&
                        (_.get(item, child.path).length !== 0 ? (
                           <button
                              className={`flex flex-row items-center justify-center transition-02 w-5 h-5 text-slate-500
                                     dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-500`}
                              disabled={!_.get(item, child.path).length}
                              onClick={(event: any) =>
                                 toggleChildTable(createUniqueId(item, generateTableName()), event)
                              }
                           >
                              <FontAwesomeIcon icon={faAngleRight} className="text-center" />
                           </button>
                        ) : (
                           <div className="w-5 h-5"></div>
                        ))}
                     {columns.map((column: columnsType, index: number) => {
                        return (
                           <div
                              data-name="cell"
                              key={createKey(item, column, index)}
                              className={` basis-${column.basis} ${column.extraClassName} `}
                           >
                              {column.image?.alt ? (
                                 <img
                                    src={renderCell(item, column)}
                                    alt={column.image.alt}
                                    className={`  ${column.image.extraClassName}`}
                                 />
                              ) : (
                                 renderCell(item, column)
                              )}
                           </div>
                        );
                     })}
                  </div>

                  {child?.path && _.get(item, child.path).length ? (
                     <div
                        data-name="child-flex-table"
                        id={createUniqueId(item, generateTableName())}
                        className="px-2 border border-slate-300 dark:border-slate-500 mb-5 mt-1 md:mx-8 rounded-md hide-child-table transition-03"
                     >
                        <div className="pr-1">
                           <FlexTable
                              parent={item}
                              tableName={generateTableName()}
                              columns={child.columns}
                              data={_.get(item, child.path)}
                              showHeader={false}
                           />
                        </div>
                     </div>
                  ) : null}
               </div>
            );
         })}
      </div>
   );
}

export default FlexTableBody;
