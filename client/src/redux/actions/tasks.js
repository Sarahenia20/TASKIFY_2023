import axios from "axios";
import { setErrors } from "../reducers/errors";
import swal from "sweetalert";
import {
  _AddTask,
  _DeleteTasks,
  _FindOneTask,
  _FindTasks,
} from "../reducers/tasks";
import { setRefresh } from "../reducers/commons";

export const AddTaskAction = (form, setPopupOpen) => async (dispatch) => {
  dispatch(setRefresh(true));
  await axios
    .post("/api/tasks", form)
    .then((res) => {
      dispatch(_AddTask(res.data.data));
      setPopupOpen(false);
      dispatch(setRefresh(false));
      dispatch(setErrors({}));
    })
    .catch((error) => {
      dispatch(setErrors(error.response.data));
      dispatch(setRefresh(false));
    });
};

export const UpdateTaskAction =
  (form, id, setPopupOpen) => async (dispatch) => {
    dispatch(setRefresh(true));
    await axios
      .put(`/api/tasks/${id}`, form)
      .then((res) => {
        dispatch(_FindOneTask(id));
        dispatch(FindTaskAction());
        setPopupOpen(false);
        dispatch(setRefresh(false));
        dispatch(setErrors({}));
      })
      .catch((error) => {
        dispatch(setErrors(error.response.data));
        dispatch(setRefresh(false));
      });
  };

export const AddCommentAction =
  (form, id, setPopupOpen) => async (dispatch) => {
    await axios
      .post(`/api/tasks/${id}/comments`, form)
      .then((res) => {
        dispatch(FindOneTaskAction(id));
        dispatch(setErrors({}));
      })
      .catch((error) => {
        dispatch(setErrors(error.response.data));
      });
  };
export const DeleteCommentAction = (id, id_c) => async (dispatch) => {
  await axios
    .delete(`/api/tasks/${id}/comments/${id_c}`)
    .then((res) => {
      dispatch(FindOneTaskAction(id));
      dispatch(setErrors({}));
    })
    .catch((error) => {
      dispatch(setErrors(error.response.data));
    });
};

export const FindTaskAction = () => async (dispatch) => {
  await axios
    .get("/api/tasks")
    .then((res) => {
      dispatch(_FindTasks(res.data.data));
    })
    .catch((error) => {
      dispatch(setErrors(error.response.data));
    });
};

export const FindOneTaskAction = (id) => async (dispatch) => {
  dispatch(setRefresh(true));
  await axios
    .get(`/api/tasks/${id}`)
    .then((res) => {
      dispatch(_FindOneTask(res.data));
      setTimeout(() => {
        dispatch(setRefresh(false));
      }, 2000);
      dispatch(setErrors({}));
    })
    .catch((error) => {
      dispatch(setErrors(error.response.data));
      dispatch(setRefresh(false));
    });
};

export const DeleteTaskAction = (id) => async (dispatch) => {
  if (window.confirm("Do you want to delete this task?")) {
    await axios
      .delete(`/api/tasks/${id}`)
      .then((res) => {
        dispatch(_DeleteTasks(id));
        swal("Success", "Task deleted successfully", "success")
      })
      .catch((error) => {
        dispatch(setErrors(error.response.data));
      });
  }
};
