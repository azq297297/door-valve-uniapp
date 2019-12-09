function newAb2Str(arrayBuffer) {
  let unit8Arr = new Uint8Array(arrayBuffer);
  let encodedString = String.fromCharCode.apply(null, unit8Arr),
    decodedString = decodeURIComponent(escape((encodedString)));//没有这一步中文会乱码
  return decodedString;
}
exports = {
  newAb2Str: newAb2Str
}