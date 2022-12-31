/* eslint-disable */
import { SdkgenError, SdkgenHttpClient } from "@sdkgen/browser-runtime";

export interface User {
    id: number
    email: string
    password: string
    githubAccount: string
    nickname: string
}

export interface LoginCredentials {
    nickname: string
    token: string
    githubAccount: string
}

export class Fatal extends SdkgenError {}

export class ApiClient extends SdkgenHttpClient {
    constructor(baseUrl: string) {
        super(baseUrl, astJson, errClasses);
    }

    forgotPassword(args: {email: string}): Promise<void> { return this.makeRequest("forgotPassword", args || {}); }
    resetPassword(args: {password: string, token: string}): Promise<string> { return this.makeRequest("resetPassword", args || {}); }
    login(args: {email: string, password: string}): Promise<LoginCredentials> { return this.makeRequest("login", args || {}); }
    register(args: {email: string, password: string, githubAccount: string, nickname: string}): Promise<string> { return this.makeRequest("register", args || {}); }
}

const errClasses = {
    Fatal
};

const astJson = {
    annotations: {},
    errors: [
        "Fatal"
    ],
    functionTable: {
        forgotPassword: {
            args: {
                email: "string"
            },
            ret: "void"
        },
        resetPassword: {
            args: {
                password: "string",
                token: "string"
            },
            ret: "string"
        },
        login: {
            args: {
                email: "string",
                password: "string"
            },
            ret: "LoginCredentials"
        },
        register: {
            args: {
                email: "string",
                password: "string",
                githubAccount: "string",
                nickname: "string"
            },
            ret: "string"
        }
    },
    typeTable: {
        User: {
            id: "uint",
            email: "email",
            password: "string",
            githubAccount: "string",
            nickname: "string"
        },
        LoginCredentials: {
            nickname: "string",
            token: "string",
            githubAccount: "string"
        }
    }
} as const;
