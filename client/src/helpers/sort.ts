export const sortWebScansByLatestDate = (webscans: any) =>
  webscans.sort(
    (a: any, b: any) =>
      new Date(b.createdTime).valueOf() - new Date(a.createdTime).valueOf()
  )
