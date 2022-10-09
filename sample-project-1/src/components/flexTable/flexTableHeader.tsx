type propsType = {
   columns: any;
};

function FlexTableHeader({ columns }: propsType) {
   return <div data-name="flex-table-header">{columns ? <p>hello, my name is header. nice to meet you</p> : ""}</div>;
}

export default FlexTableHeader;
