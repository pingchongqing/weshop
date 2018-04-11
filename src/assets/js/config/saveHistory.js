export default function saveBrowseHistory(historyData) {
  if(localStorage.CabBrowseHistory) {
    let BrowseHistory = JSON.parse(localStorage.CabBrowseHistory)
    BrowseHistory = BrowseHistory.filter(data=>JSON.stringify(data) !== JSON.stringify(historyData))
    if (BrowseHistory.length>=5) {
      BrowseHistory.pop()
    }
    BrowseHistory.unshift(historyData)
    localStorage.setItem('CabBrowseHistory', JSON.stringify(BrowseHistory))
  } else {
    localStorage.setItem('CabBrowseHistory', JSON.stringify([historyData]))
  }
}
