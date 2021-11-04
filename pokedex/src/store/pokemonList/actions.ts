import {
  FETCH_LIST_REQUEST,
  FETCH_LIST_FAILURE,
  FETCH_LIST_SUCCESS,
} from "./actionTypes";
import {
  FetchListRequest,
  FetchListSuccess,
  FetchListSuccessPayload,
  FetchListFailure,
  FetchListFailurePayload,
} from "./types";

export const fetchListRequest = (): FetchListRequest => ({
  type: FETCH_LIST_REQUEST,
});

export const fetchListSuccess = (
  payload: FetchListSuccessPayload
): FetchListSuccess => ({
  type: FETCH_LIST_SUCCESS,
  payload,
});

export const fetchListFailure = (
  payload: FetchListFailurePayload
): FetchListFailure => ({
  type: FETCH_LIST_FAILURE,
  payload,
});
