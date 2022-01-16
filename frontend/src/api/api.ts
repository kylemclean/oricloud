import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CreateJobResult, Job, JobCreate } from './models/job';
import { LoginSuccessResult } from './models/login';
import { CreateProgramResult, Program, ProgramCreate } from './models/program';
import { Run, RunNew, RunCompletion, CompleteRunResult } from './models/run';

class Api {
    private axiosInstance: AxiosInstance;
    private baseURL?: string;

    constructor(config: AxiosRequestConfig) {
        this.axiosInstance = axios.create(config);
        this.baseURL = config.baseURL;

        this.axiosInstance.interceptors.request.use(requestConfig => {
            const token = localStorage.getItem("token");
            if (token) {
                requestConfig.headers = config.headers ?? {};
                requestConfig.headers["Authorization"] = `Bearer ${token}`;
            }
            return requestConfig;
        })
    }

    getJobs = async (): Promise<Job[]> =>
        (await this.axiosInstance.get<Job[]>('/jobs')).data;

    getJob = async (jobId: string): Promise<Job> =>
        (await this.axiosInstance.get<Job>(`/jobs/${jobId}`)).data;

    createJob = async (job: JobCreate): Promise<CreateJobResult> => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(job))
            formData.append(key, value);

        return (await this.axiosInstance.post<FormData, AxiosResponse<CreateJobResult>>(
            '/jobs',
            formData,
            {
                headers: { "Content-type": "multipart/form-data" }
            }
        )).data;
    }

    getPrograms = async (): Promise<Program[]> =>
        (await this.axiosInstance.get<Program[]>('/programs')).data;

    getProgram = async (programId: string): Promise<Program> =>
        (await this.axiosInstance.get<Program>(`/programs/${programId}`)).data;

    createProgram = async (program: ProgramCreate): Promise<CreateProgramResult> => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(program))
            formData.append(key, value);

        return (await this.axiosInstance.post<FormData, AxiosResponse<CreateProgramResult>>(
            '/programs',
            formData,
            {
                headers: { "Content-type": "multipart/form-data" }
            }
        )).data;
    }

    getRuns = async (jobId: string): Promise<Run[]> =>
        (await this.axiosInstance.get<Run[]>(`/runs?job=${jobId}`)).data;

    getRun = async (runId: string): Promise<Run> =>
        (await this.axiosInstance.get<Run>(`/runs/${runId}`)).data;

    createRun = async (userId: string): Promise<RunNew> =>
        (await this.axiosInstance.post<RunNew>(`runs?user=${userId}`)).data;

    completeRun = async (runId: string, runCompletion: RunCompletion): Promise<CompleteRunResult> =>
        (await this.axiosInstance.put<RunCompletion, AxiosResponse<CompleteRunResult>>(
            `runs/${runId}`, runCompletion)).data;

    runOutputUrl = (runId: string): string =>
        `${this.baseURL ?? '/'}/runs/${runId}/output`

    login = async (email: string, password: string): Promise<void> => {
        try {
            const result = (await this.axiosInstance.post<void, AxiosResponse<LoginSuccessResult>>(
                '/token',
                `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret`,
                {
                    headers: {
                        "accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            )).data;

            localStorage.setItem("token", result.access_token);
        } catch (err) { }
    }
}

const api = new Api({
    baseURL: 'http://localhost:8000'
});

export default api;