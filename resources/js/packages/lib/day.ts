import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import 'dayjs/locale/zh-cn'
import isToday from 'dayjs/plugin/isToday'
import localeData from 'dayjs/plugin/localeData'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localeData)
dayjs.extend(isToday)
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export const tz = 'Asia/Seoul'

export default dayjs
