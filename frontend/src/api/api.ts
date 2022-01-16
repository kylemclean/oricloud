import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CreateJobResult, Job, JobCreate } from './models/job';
import { CreateProgramResult, Program, ProgramCreate } from './models/program';
import { Run, RunNew, RunCompletion, CompleteRunResult } from './models/run';

class Api {
    private axiosInstance: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        this.axiosInstance = axios.create(config);
    }

    getJobs = async (): Promise<Job[]> =>
        (await this.axiosInstance.get<Job[]>('/jobs')).data;

    getJob = async (jobId: string): Promise<Job> =>
        (await this.axiosInstance.get<Job>(`/jobs/${jobId}`)).data;

    createJob = async (job: JobCreate): Promise<CreateJobResult> =>
        (await this.axiosInstance.post<JobCreate, AxiosResponse<CreateJobResult>>(
            '/jobs', job)).data;

    getPrograms = async (): Promise<Program[]> =>
        (await this.axiosInstance.get<Program[]>('/programs')).data;

    getProgram = async (programId: string): Promise<Program> =>
        (await this.axiosInstance.get<Program>(`/programs/${programId}`)).data;

    createProgram = async (program: ProgramCreate): Promise<CreateProgramResult> =>
        (await this.axiosInstance.post<ProgramCreate, AxiosResponse<CreateProgramResult>>(
            '/programs', program)).data;

    getRuns = async (jobId: string): Promise<Run[]> =>
        (await this.axiosInstance.get<Run[]>(`/runs?job=${jobId}`)).data;

    getRun = async (runId: string): Promise<Run> =>
        (await this.axiosInstance.get<Run>(`/runs/${runId}`)).data;

    createRun = async (userId: string): Promise<RunNew> =>
        (await this.axiosInstance.post<RunNew>(`runs?user=${userId}`)).data;

    completeRun = async (runId: string, runCompletion: RunCompletion): Promise<CompleteRunResult> =>
        (await this.axiosInstance.put<RunCompletion, AxiosResponse<CompleteRunResult>>(
            `runs/${runId}`, runCompletion)).data;
}

const api = new Api({
    baseURL: 'http://localhost:8000'
});

export default api;