export const Filter = (filters?: {dateRange : Array<Date>, text: string}) => {

  let filterText = {};
  let filterDate = {};

  const firstDate = filters?.dateRange?.[0];
  const endDate = filters?.dateRange?.[1];

  const text = filters?.text;


  if(text?.length! > 2){
    filterText = { $text: { $search: text } }
  }

  if(filters?.dateRange.length){
    console.log(filters?.dateRange);
    
    filterDate = { createdAt: { $gte: firstDate, $lte: endDate } };
  }


  return Object.keys(filterText).length > 0 ? filterText : filterDate;
}