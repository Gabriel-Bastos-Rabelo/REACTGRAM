//Redux
import { resetMessage } from "../src/slices/photoSlice";

export const useResetComponentMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }
}