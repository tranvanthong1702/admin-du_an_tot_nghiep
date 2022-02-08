import moment from 'moment'

export const DateHelper = {
  progress(startAt: string | number | Date, endAt: string | number | Date): number {
    const diff = moment().diff(moment(startAt), 'day') / moment(endAt).diff(moment(startAt), 'day')
    if (diff * 100 <= 100) {
      return diff * 100
    }
    return 100
  }
}
