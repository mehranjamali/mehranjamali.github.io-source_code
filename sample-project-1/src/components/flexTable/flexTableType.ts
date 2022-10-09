type columnsType = {
   path: string;
   label?: string;
   basis?: string;
   extraClassName?: string;
   content?: any;
   image?: { alt: string; extraClassName?: string };
};
type childType = {
   path: string;
   columns: columnsType[];
};

export type { columnsType, childType };
