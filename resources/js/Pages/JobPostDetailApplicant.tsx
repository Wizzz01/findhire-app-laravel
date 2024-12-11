import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import { useState } from 'react'

export interface JobPost {
  id: number
  job_title: string
  description: string
  job_requirements: string
  Salary: string
  hr_id: number
  created_at: string
  updated_at: string
  applications: Application[]
}

export interface Application {
  id: number
  user_id: number
  job_post_id: number
  resume: string | null
  status: string
  created_at: string
  updated_at: string
}

import { PageProps as InertiaPageProps } from '@inertiajs/core'

interface PageProps extends InertiaPageProps {
  jobPost: JobPost
  hrUser: {
    id: number
    name: string
  }
  canApply: boolean
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

export default function JobPostDetailApplicant() {
  const { jobPost, hrUser, canApply } = usePage<PageProps>().props
  const [resume, setResume] = useState<File | null>(null)
  const [candidateReason, setCandidateReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleApply = () => {
    if (!resume || candidateReason.trim() === '') {
      alert('Please upload your resume and provide a reason before applying.')
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('resume', resume)
    formData.append('job_post_id', jobPost.id.toString())
    formData.append('reason', candidateReason)

    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content')

    if (!csrfToken) {
      alert('CSRF token not found')
      setIsSubmitting(false)
      return
    }

    // Submit the application
    fetch('/applications', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRF-TOKEN': csrfToken,
      },
    })
      .then((response) => {
        setIsSubmitting(false)
        if (response.ok) {
          alert('Application submitted successfully!')
          // Optionally, reset the form
          setResume(null)
          setCandidateReason('')
        } else {
          alert('Error submitting application.')
        }
      })
      .catch(() => {
        setIsSubmitting(false)
        alert('An error occurred. Please try again.')
      })
  }

  return (
    <AuthenticatedLayout>
      <Head title="Job Post Details - FindHire" />
      <div className="px-64 py-10 text-justify">
        <h1 className="text-3xl font-bold text-white">{jobPost.job_title}</h1>
        <p className="mt-4 text-white">{jobPost.description}</p>
        <p className="mt-4 text-white">
          <strong>Salary:</strong> {jobPost.Salary}
        </p>
        <p className="mt-4 text-white">
          <strong>Posted By:</strong> {hrUser ? hrUser.name : 'N/A'}
        </p>

        {canApply && (
          <>
            {/* Reason Input */}
            <div className="mt-4">
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-white"
              >
                Why are you the best candidate for this job?
              </label>
              <textarea
                id="reason"
                value={candidateReason}
                onChange={(e) => setCandidateReason(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 p-2 text-black shadow-sm"
                rows={4}
              ></textarea>
            </div>

            {/* Resume Upload */}
            <div className="mt-4">
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-white"
              >
                Upload Resume (PDF)
              </label>
              <input
                id="resume"
                type="file"
                accept="application/pdf"
                onChange={(e) =>
                  setResume(e.target.files ? e.target.files[0] : null)
                }
                className="mt-2 block w-full self-center rounded-md border-gray-300 text-white shadow-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleApply}
              disabled={isSubmitting}
              className={`mt-4 inline-block rounded-md px-4 py-2 text-white ${
                isSubmitting
                  ? 'cursor-not-allowed bg-gray-500'
                  : 'bg-cyan-400 hover:bg-cyan-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Apply'}
            </button>
          </>
        )}
      </div>
    </AuthenticatedLayout>
  )
}
