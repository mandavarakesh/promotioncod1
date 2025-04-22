const generateBase64ToExcel = (
  { base64Data, setOpen, setError, setSnackbarMessage },
  isPdf = false
) => {
  try {
    // Decode base64 data
    const binaryData = window.atob(base64Data)

    // Convert binaryData to Uint8Array
    const uint8Array = new Uint8Array(binaryData.length)
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i)
    }

    // Create Blob object
    const blob = new Blob([uint8Array], {
      type: isPdf
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    // Create URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create a downloadable link and trigger the download
    const a = document.createElement("a")
    a.href = url
    a.download = isPdf ? "Trex_Order_Receipt.pdf" : "Trex_Products.xlsx" // Set the desired file name
    document.body.appendChild(a)
    a.click()
    a.remove()
    setOpen(true)
    setSnackbarMessage(
      isPdf
        ? "Succesfully Downloaded Document"
        : "Successfully Downloaded Product Template"
    )
  } catch (error) {
    setOpen(true)
    setError(true)
    setSnackbarMessage("Unable to Generate Template")
  }
}

export default generateBase64ToExcel
