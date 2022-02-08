import { useIntl } from 'react-intl'

export function useTranslate() {
  const intl = useIntl()
  return function(key: string, params: object = {}) {
    return intl.formatMessage({ id: key }, { ...params })
  }
}
