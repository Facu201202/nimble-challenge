import type { Job, Candidate, ApplyToJobPayload, ApplyToJobResponse } from "../types";

const BASE_URL ="https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net"

export async function getJobs(): Promise<Job[]> {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`)
    if(!response.ok) {
        throw new Error("Failed to fetch jobs")
    }

    const data: Job[] = await response.json()
    return data
}

export async function getCandidate(candidateEmail: Candidate["email"]): Promise<Candidate> {
    const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${candidateEmail}`)
    if(!response.ok) {
        throw new Error("Failed to fetch candidate")
    }
    const data: Candidate = await response.json()
    return data
}

export async function applyToJob(payload: ApplyToJobPayload): Promise<ApplyToJobResponse> {
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if(!response.ok) {
        throw new Error("Failed to apply to job")
    }

    const data: ApplyToJobResponse = await response.json()
    return data

}