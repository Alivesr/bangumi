import api from './axios'

const getCalendar = async () => {
  const res = await api.get('/calendar')
  return res
}

export { getCalendar }
