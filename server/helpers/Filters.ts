export const Filter = (filters?: {dateRange? : Array<Date>, text?: string}, state?: Array<number>) => {

  let filterText = {};
  let filterDate = {};

  const firstDate = filters?.dateRange?.[0];
  const endDate = filters?.dateRange?.[1];

  const text = filters?.text;


  if(text?.length! > 2){
    filterText = {field: { $in: state }, $text: { $search: text } }
  }

  if(filters?.dateRange?.length){
    filterDate = {field: { $in: state }, createdAt: { $gte: firstDate, $lte: endDate } };
  }


  return Object.keys(filterText).length > 0 ? filterText : filterDate;
}