// type
import { columnsType, childType } from "./flexTableType";
import FlexTableBody from "./flexTableBody";
import FlexTableHeader from "./flexTableHeader";

type propsType = {
   data: any;
   columns: columnsType[];
   child?: childType;
   parent?: any;
   showHeader: boolean;
   tableName: string;
   childTableName?: string;
};

function FlexTable({ data, columns, showHeader, child, tableName, childTableName, parent }: propsType) {
   return (
      <div data-name="flex-table" dir="ltr">
         <FlexTableHeader columns={showHeader ? columns : null} />
         <FlexTableBody
            tableName={tableName}
            columns={columns}
            data={data}
            childTableName={childTableName}
            child={child}
            parent={parent}
         />
      </div>
   );
}

export type { columnsType };
export default FlexTable;
