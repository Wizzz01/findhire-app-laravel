import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps as InertiaPageProps } from '@inertiajs/core/types/types'
import { usePage } from '@inertiajs/react'

export interface JobPost {
  id: number
  job_title: string
  description: string
  job_requirements: string
  Salary: string
  hr_id: number
  created_at: string
  updated_at: string
  user: {
    id: number
    name: string
  }
  applications: Application[]
}

export interface Application {
  reason: string
  id: number
  user_id: number
  job_post_id: number
  resume: string | null
  status: string
  created_at: string
  updated_at: string
  user: {
    id: number
    name: string
    email: string
  }
}

interface PageProps extends InertiaPageProps {
  jobPost: JobPost
  applications: Application[]
  hrUser: {
    id: number
    name: string
  }
  auth: {
    user: {
      id: number
      name: string
      email: string
      mobile_number: number
      role: string
      image: string
      designation: string
    }
  }
}

export default function JobPostDetailHR() {
  const { jobPost, hrUser, applications } = usePage<PageProps>().props

  if (!jobPost || !applications) {
    return <div>Loading...</div>
  }

  const handleStatusChange = (applicationId: number, status: string) => {
    fetch(`/applications/${applicationId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':
          (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)
            ?.content || '',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert(`Application marked as ${status}`)
          location.reload() // Optional: Reload the page to reflect changes
        } else {
          alert('Error updating application status')
        }
      })
      .catch((err) => console.error('Error:', err))
  }

  return (
    <AuthenticatedLayout>
      <div className="px-64 py-10 text-justify">
        <h1 className="text-3xl font-bold text-white">{jobPost.job_title}</h1>
        <p className="mt-4 text-white">{jobPost.description}</p>
        <p className="mt-4 text-white">
          <strong>Salary:</strong> {jobPost.Salary}
        </p>
        <p className="mt-4 text-white">
          <strong>Posted By:</strong> {hrUser.name}
        </p>

        <h2 className="mt-8 text-2xl font-bold text-white">Applicants:</h2>
        <ul className="mt-4">
          {applications.map((application: Application) => (
            <li
              key={application.id}
              className="mb-4 rounded-md bg-gray-800 p-4"
            >
              <p className="font-semibold text-white">
                {application.user
                  ? application.user.name + ' (' + application.user.email + ')'
                  : 'User details not available'}
              </p>

              {application.resume ? (
                <a
                  href={`/applications/${application.id}/download-resume`}
                  className="text-cyan-400 hover:underline"
                  download
                >
                  Download Resume
                </a>
              ) : (
                <p className="text-white">No resume uploaded</p>
              )}
              {application.reason ? (
                <p className="mt-2 text-white">
                  <strong>Why hire me?</strong> {application.reason}
                </p>
              ) : (
                <p className="mt-2 text-white">No reason provided</p>
              )}

              {/* Status Label */}
              <div className="mt-2">
                {application.status === 'hired' && (
                  <span className="mb-2 inline-block rounded-full bg-green-300 px-3 py-1 text-sm font-bold text-green-800">
                    Hired
                  </span>
                )}
                {application.status === 'rejected' && (
                  <span className="mb-2 inline-block rounded-full bg-red-300 px-3 py-1 text-sm font-bold text-red-800">
                    Rejected
                  </span>
                )}
                {application.status === 'pending' && (
                  <span className="mb-2 inline-block rounded-full bg-yellow-300 px-3 py-1 text-sm font-bold text-yellow-800">
                    Pending
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-2">
                <button
                  onClick={() => handleStatusChange(application.id, 'hired')}
                  className="mr-2 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-700"
                >
                  Hire
                </button>
                <button
                  onClick={() => handleStatusChange(application.id, 'rejected')}
                  className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AuthenticatedLayout>
  )
}
