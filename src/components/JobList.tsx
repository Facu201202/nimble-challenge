import type { Candidate, Job } from "../types";
import JobItem from "./JobItem";

type JobListProps = {
  jobs: Job[];
  candidate: Candidate | null;
}

export default function JobList({ jobs, candidate }: JobListProps) {
  return (
    <ul>
      {jobs.map((job) => (
        <JobItem key={job.id} candidate={candidate} job={job} />
      ))}
    </ul>
  );
}
