import { PageProps } from '@/types'
import { Head, Link } from '@inertiajs/react'

export default function Welcome({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <>
      <Head title="FindHire" />
      <div className="flex min-h-screen flex-col bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
          <header className="grid grid-cols-2 items-center gap-2 py-4 lg:grid-cols-3">
            <div className="flex lg:col-start-2 lg:justify-center">
              <img
                src="/FindHire.png"
                alt="FindHire logo"
                className="h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]"
              />
            </div>
            <nav className="-mx-3 flex flex-1 justify-end">
              {auth.user ? (
                <Link
                  href={route('Home')}
                  className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >
                  Home
                </Link>
              ) : (
                <>
                  <Link
                    href={route('login')}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                  >
                    Log in
                  </Link>
                  <Link
                    href={route('register')}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                  >
                    Register
                  </Link>
                  <Link
                    href={route('registerHR')}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                  >
                    Register as an HR account
                  </Link>
                </>
              )}
            </nav>
          </header>

          <main className="flex flex-grow items-center justify-center">
            <section className="py-15 text-center">
              <h1 className="mb-4 text-4xl font-bold">Welcome to FindHire</h1>
              <p className="text-lg text-gray-600">
                Find a job. Get Hired. <br></br>
              </p>
              <a href="register">
                <br></br>Start your journey with us now.
              </a>
            </section>
          </main>

          <footer className="mt-auto py-4 text-center text-sm text-black dark:text-white/70">
            Laravel v{laravelVersion} (PHP v{phpVersion})
          </footer>
        </div>
      </div>
    </>
  )
}
