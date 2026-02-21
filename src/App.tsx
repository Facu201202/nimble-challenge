import { useEffect, useState } from "react";
import "./App.css";
import type { Candidate, Job } from "./types";
import { getCandidate, getJobs } from "./service/api";
import JobList from "./components/JobList";

const EMAIL = "facuu201202@gmail.com";

function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidateLoading, setCandidateLoading] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [candidateError, setCandidateError] = useState<string | null>(null);
  const [jobsError, setJobsError] = useState<string | null>(null);

  useEffect(() => {
    const loadCandidate = async () => {
      try {
        setCandidateLoading(true);
        setCandidateError(null);
        const data = await getCandidate(EMAIL);
        setCandidate(data);
      } catch (error) {
        setCandidateError((error as Error).message);
      } finally {
        setCandidateLoading(false);
      }
    };

    loadCandidate();
  }, []);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setJobsLoading(true);
        setJobsError(null);
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        setJobsError((error as Error).message);
      } finally {
        setJobsLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <div className="container">
      <h1>Solicitud para candidato: {EMAIL}</h1>
      {candidateLoading ? (
        <p>Cargando información del candidato...</p>
      ) : candidateError ? (
        <p style={{ color: "red" }}>
          No se pudo cargar el candidato. No podrás aplicar.
        </p>
      ) : candidate ? (
        <div>
          <h2>Información del Candidato</h2>
          <p>
            Nombre: {candidate.firstName} {candidate.lastName}
          </p>
          <p>Email: {candidate.email}</p>
        </div>
      ) : null}

      <h1>Lista de trabajos disponibles</h1>
      {jobsLoading ? (
        <p>Cargando trabajos...</p>
      ) : jobsError ? (
        <p style={{ color: "red" }}>
          Error al cargar los trabajos: {jobsError}
        </p>
      ) : jobs.length === 0 ? (
        <p>No hay trabajos disponibles en este momento.</p>
      ) : (
        <JobList jobs={jobs} candidate={candidate} />
      )}
    </div>
  );
}

export default App;
