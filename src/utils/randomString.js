export default function randomString(length = 5) {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
}
