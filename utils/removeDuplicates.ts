export const removeDuplicates = (array: any[], key: string) => {
  return array.reduce((result, item) => {
    const duplicate = result.find(
      (resultItem: typeof item) => resultItem[key] === item[key]
    )
    if (!duplicate) {
      result.push(item)
    }
    return result
  }, [])
}
