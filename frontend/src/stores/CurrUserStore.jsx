import { create } from "zustand";

const useCurrUserStore = create((set) => ({
	currUser: {},
	currUserToken: "",
	updateCurrUser: (data) => set(() => ({ currUser: data })),
	updateCurrUserToken: (data) => set(() => ({ currUserToken: data })),
	removeCurrUser: () => set(() => ({ currUser: {} })),
	removeCurrUserToken: () => set(() => ({ currUserToken: "" })),
}));

export default useCurrUserStore;
