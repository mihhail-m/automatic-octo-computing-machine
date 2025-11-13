import { fetch } from "undici";

// TODO: Refactor all CRUD operation into a single method
// TODO: Add pooling 
export interface ApiClientOptions {
  baseUrl: string;
  token?: string;
}

export class ApiClient {
  private baseUrl: string = 'http://localhost:3001/users';
  private token?: string;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl;
    this.token = options.token;
  }

  private buildHeaders(extra?: any) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...extra,
    };
    if (this.token) headers["Authorization"] = `Bearer ${this.token}`;

    return headers;
  }

  async get(path: string) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "GET",
      headers: this.buildHeaders(),
    });

    if (!res.ok) throw new Error(`GET ${path} failed with ${res.status}`);

    return (await res.json());
  }

  async post(path: string, body: unknown) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: this.buildHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`POST ${path} failed with ${res.status}`);

    return (await res.json());
  }

  async delete(path: string) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
      headers: this.buildHeaders(),
    });

    if (!res.ok) throw new Error(`DELETE ${path} failed with ${res.status}`);

    return (await res.json());
  }

  setToken(token: string) {
    this.token = token;
  }
}

