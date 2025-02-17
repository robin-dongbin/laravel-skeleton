import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import 'dayjs/locale/zh-cn'
import localeData from 'dayjs/plugin/localeData'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localeData)
dayjs.locale('zh-cn')

window.dayjs = dayjs
