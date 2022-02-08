function getItem(key: string): any | null {
  const item = localStorage.getItem(key)
  if (!item) {
    return null
  }
  return JSON.parse(item)
}

function getItemDefault(key: string, value: any): any {
  const item = localStorage.getItem(key)
  if (item) {
    return JSON.parse(item)
  }
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

function setItem(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value))
}

function removeItem(key: string): void {
  localStorage.removeItem(key)
}

const StorageHelper = { getItem, setItem, getItemDefault, removeItem }

export default StorageHelper
