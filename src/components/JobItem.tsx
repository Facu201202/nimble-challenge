import { useState } from "react";
import type { Candidate, Job } from "../types";
import { applyToJob } from "../service/api";

type JobItemProps = {
  candidate: Candidate | null;
  job: Job;
};

export default function JobItem({ candidate, job }: JobItemProps) {
  const [githubUrl, setGithubUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidate) return;

    if (!githubUrl.trim()) {
      setError("Se requiere la URL del repositorio.");
      return;
    }

    if (!githubUrl.startsWith("https://github.com/")) {
      setError("La URL debe ser un repositorio de GitHub válido.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl: githubUrl,
        applicationId: candidate.applicationId,
      });

      setSuccess("Postulación enviada con éxito.");
      setGithubUrl("");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <li>
      <h3>{job.title}</h3>
      <p>Ingresa tu url de github para postularte al trabajo</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={githubUrl}
          onChange={(e) => {
              setGithubUrl(e.target.value);
              if(error) setError(null);
            }
          }
          placeholder="https://github.com/username/repo"
        />
        <button
          type="submit"
          disabled={submitting || success !== null || !candidate}
        >
          {submitting ? "Enviando..." : "Postularse"}
        </button>
        {!candidate && (
          <p style={{ color: "red" }}>
            No se puede aplicar sin información de candidato.
          </p>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </li>
  );
}
