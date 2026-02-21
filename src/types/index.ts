export type Candidate = {
  uuid: string
  candidateId: string
  applicationId: string
  firstName: string
  lastName: string
  email: string
}

export type Job = {
  id: string
  title: string
}

export type ApplyToJobPayload = {
  uuid: string
  jobId: string
  candidateId: string
  repoUrl: string
}

export type ApplyToJobResponse = {
  ok: boolean
}