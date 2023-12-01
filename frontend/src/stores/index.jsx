import { create } from "zustand";

const useStore = create((set, get) => ({
	globalStateStore: globalStateStore(set, get),
}));

export default useStore;
