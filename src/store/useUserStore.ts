
import { UserStore } from "@/types/api/user.type";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

export const userStoreCreator: StateCreator<UserStore, [], [], UserStore> = ((set) => ({
    id:null,
    token: null,
    isLogin:false,
    login: (token:string) => {
        const decoded: { id: string; } = jwtDecode(token);
        set({ id:decoded.id, token, isLogin:true })
    },
    logout: () => set({ id: null, token: null, isLogin:false}),
}));
export const useUserStore = create<UserStore>()(
    persist(userStoreCreator, {
      name: 'user-storage',
    })
  );
