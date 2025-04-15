export type User ={
    id:string,
    name:string,
    email:string,
    password:string,
}

export type UserStore = {
    id: string | null;
    token: string | null;
    isLogin:boolean | null;
    login: (token: string) => void;
    logout: () => void;
  };