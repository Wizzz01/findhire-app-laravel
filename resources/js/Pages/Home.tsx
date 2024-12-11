import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'

interface JobPost {
  id: number
  job_title: string
  description: string
  Salary: string
}

interface HomeProps {
  jobPosts: JobPost[]
}

export default function Home({ jobPosts }: HomeProps) {
  return (
    <AuthenticatedLayout>
      <Head title="FindHire - Homepage" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="mb-6 text-2xl font-bold text-white">
            Welcome to FindHire
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobPosts.map((job) => (
              <div
                key={job.id}
                className="overflow-hidden bg-white shadow-md sm:rounded-lg dark:bg-gray-800"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {job.job_title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {job.description}
                  </p>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    <strong>Salary:</strong> {job.Salary}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={`/job-posts/${job.id}`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
