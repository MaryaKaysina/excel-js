import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE,
} from '@/redux/types';

export const tableResize = (data) => {
  return {
    type: TABLE_RESIZE,
    data,
  };
};

export const changeText = (data) => {
  return {
    type: CHANGE_TEXT,
    data,
  };
};

export const changeStyles = (data) => {
  return {
    type: CHANGE_STYLES,
    data,
  };
};

export const applyStyles = (data) => {
  return {
    type: APPLY_STYLE,
    data,
  };
};

export const changeTitle = (data) => {
  return {
    type: CHANGE_TITLE,
    data,
  };
};

export const updateDate = () => {
  return {
    type: UPDATE_DATE,
  };
};
