import {
  FETCH_SELECTED_REQUEST,
  FETCH_SELECTED_FAILURE,
  FETCH_SELECTED_SUCCESS,
} from "./actionTypes";
import {
  FetchSelectedRequest,
  FetchSelectedSuccess,
  FetchSelectedSuccessPayload,
  FetchSelectedFailure,
  FetchSelectedFailurePayload,
} from "./types";

export const fetchSelectedRequest = (name: string): FetchSelectedRequest => ({
  type: FETCH_SELECTED_REQUEST,
  name: name,
});

export const fetchSelectedSuccess = (
  payload: FetchSelectedSuccessPayload
): FetchSelectedSuccess => ({
  type: FETCH_SELECTED_SUCCESS,
  payload,
});

export const fetchSelectedFailure = (
  payload: FetchSelectedFailurePayload
): FetchSelectedFailure => ({
  type: FETCH_SELECTED_FAILURE,
  payload,
});
