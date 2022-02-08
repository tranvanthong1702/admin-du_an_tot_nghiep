const locales: any = {
  vi: {
    locale: 'vi-VN',
    currency: 'VND'
  },
  en: {
    locale: 'en-US',
    currency: 'USD'
  }
}

export default function currencyFormat(currency: number): string {
  let lang: string = 'en'
  const i18nConfig = localStorage.getItem('i18nConfig') || null
  if (i18nConfig) {
    lang = JSON.parse(i18nConfig).selectedLang
  }

  return new Intl.NumberFormat(locales[lang].locale, {
    style: 'currency',
    currency: locales[lang].currency
  }).format(currency)
}
