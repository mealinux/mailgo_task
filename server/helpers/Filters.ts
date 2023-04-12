export const Filter = (filters?: {dateRange? : Array<Date>, text?: string}, state?: Array<number>) => {

  let filterText = {};
  let filterDate = {};
  let fieldState = {};

  const firstDate = filters?.dateRange?.[0];
  const endDate = filters?.dateRange?.[1];

  const text = filters?.text;

  if(state){
    fieldState = { state: { $in: state }} ;
  }

  if(text?.length! > 2){
    filterText = { $text: { $search: text } }
  }

  if(filters?.dateRange?.length){
    filterDate = {...fieldState, createdAt: { $gte: firstDate, $lte: endDate } };
  }

  if(!filters?.dateRange?.length && state){
    filterDate = {...fieldState};
  }
  
  return Object.keys(filterText).length > 0 ? filterText : filterDate;
}