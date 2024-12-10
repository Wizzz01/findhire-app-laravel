import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateJobPost() {
    const [formData, setFormData] = useState({
        job_title: '',
        description: '',
        job_requirements: '',
        salary: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post('/job-posts', formData);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    FindHire
                </h2>
            }
        >
            <Head title="Create Job Post" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <h1 className="mb-6 text-2xl font-bold text-white">
                            Create a Job Post
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="job_title"
                                    className="block text-sm font-medium text-white"
                                >
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    name="job_title"
                                    id="job_title"
                                    value={formData.job_title}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-white"
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    rows={4}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="job_requirements"
                                    className="block text-sm font-medium text-white"
                                >
                                    Job Requirements
                                </label>
                                <textarea
                                    name="job_requirements"
                                    id="job_requirements"
                                    value={formData.job_requirements}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="salary"
                                    className="block text-sm font-medium text-white"
                                >
                                    Salary
                                </label>
                                <input
                                    type="text"
                                    name="salary"
                                    id="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-cyan-400 px-4 py-2 text-white shadow hover:bg-cyan-700"
                                >
                                    Create Job Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
