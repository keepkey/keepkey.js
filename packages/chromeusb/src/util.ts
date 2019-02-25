export function makePromise(func: Function, ...args: any[]): Promise<any> {
  return new Promise((resolve) => {
    func(...args, resolve)
  })
}