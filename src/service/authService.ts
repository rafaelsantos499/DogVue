import type { Login, CreaterUser } from "@/models/Login";
import { apiService } from "./apiService";
import type { Usuario } from "@/models/usuario";

interface AuthloginResponse {
    token: string;
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
    saveToken(token: string) {
        window.localStorage.setItem("token", "Bearer " + token);
    },
    removeToken() {
        window.localStorage.removeItem("token");
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
