import { LoginBox } from './components/LoginBox'

export default function App() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-instagram-bg px-4 py-10">
      <LoginBox />

      <footer className="mt-9 max-w-[350px] text-center">
        <p className="text-[12px] leading-4 text-instagram-text-secondary">
          Get the app.
        </p>
        <div className="mt-3 flex justify-center gap-2">
          <a
            href="#"
            className="inline-block h-10 w-[134px] rounded-md bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzQiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAxMzQgNDAiPjxyZWN0IHdpZHRoPSIxMzQiIGhlaWdodD0iNDAiIHJ4PSI1IiBmaWxsPSIjMDAwIi8+PHRleHQgeD0iNjciIHk9IjI0IiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BcHAgU3RvcmU8L3RleHQ+PC9zdmc+')] bg-cover bg-center"
            aria-label="Download on the App Store"
          />
          <a
            href="#"
            className="inline-block h-10 w-[134px] rounded-md bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzQiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAxMzQgNDAiPjxyZWN0IHdpZHRoPSIxMzQiIGhlaWdodD0iNDAiIHJ4PSI1IiBmaWxsPSIjMDAwIi8+PHRleHQgeD0iNjciIHk9IjI0IiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Hb29nbGUgUGxheTwvdGV4dD48L3N2Zz4=')] bg-cover bg-center"
            aria-label="Get it on Google Play"
          />
        </div>
      </footer>
    </main>
  )
}
