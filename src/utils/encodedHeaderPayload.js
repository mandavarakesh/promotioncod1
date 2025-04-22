const encodedHeaderPayload = (data) => {
  return encodeURIComponent(btoa(JSON.stringify(data)))
}

export default encodedHeaderPayload
