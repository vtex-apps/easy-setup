export async function sleep(delay_ms = 1000) {
  return new Promise<boolean>(resolve => {
    setTimeout(() => {
      resolve(true)
    }, delay_ms)
  })
}

export async function delayPromise<T = unknown>(
  promise: Promise<T>,
  delay_ms = 1000
) {
  return new Promise<T>(resolve => {
    setTimeout(() => resolve(promise), delay_ms)
  })
}
