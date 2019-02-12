export function leByteSliceToLong(bb: ByteBuffer) {
  let value = 0
  for (let i = 0; i < bb.limit; i++) {
    value = (value * 256) + bb.readByte(i)
  }
  return value
}