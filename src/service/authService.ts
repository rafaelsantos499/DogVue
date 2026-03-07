import type { Login, CreaterUser } from "@/models/Login";
import { apiService } from "./apiService";
import type { Usuario } from "@/models/usuario";

interface AuthloginResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    user: Usuario
}

export const authService = {
    async login(body: Login) : Promise<AuthloginResponse> {
        const { data } = await apiService.post(
            "/auth/login",
            body
        );
        return data;
    },
    async validate(): Promise<AuthloginResponse> {
        const { data } = await apiService.get(
            "/auth/me"
        );
        return data;
    },
    async refreshToken(refreshToken: string): Promise<AuthloginResponse> {
        const { data } = await apiService.post("/auth/refresh", {}, {
            headers: { Authorization: "Bearer " + refreshToken },
        });
        return data;
    },
    saveToken(token: string,refreshToken?: string) {
        window.localStorage.setItem("token", "Bearer " + token);
        if (refreshToken) {
            window.localStorage.setItem("refreshToken", refreshToken);
        }
    },
    removeToken() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("refreshToken");
    },
    async loginGoogle(idToken: string): Promise<AuthloginResponse> {
        const { data } = await apiService.post("auth/firebase", { id_token: idToken });
        return data;
    },
    async register(body: CreaterUser) {
        const { data } = await apiService.post("api/user", body);
        return data;
    },
}
