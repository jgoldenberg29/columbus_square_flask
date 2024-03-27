import { getAllEvents } from "./events";
import { getAllNews } from './news'

export const thunkGetAllData = () => async dispatch => {
  const res = await fetch('/api/allData')

  if(res.ok) {
      const data = await res.json();
      dispatch(getAllEvents(data.events))
      dispatch(getAllNews(data.news))
      return null
  } else {
      const data = await res.json();
      return data
  }
}

