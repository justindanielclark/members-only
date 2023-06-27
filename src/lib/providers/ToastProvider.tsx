"use client";
import { createContext, useState, useContext } from "react";
import { Toast } from "../../../types/types";
import { v4 } from "uuid";

const context = createContext<null | Context>(null);

type Context = {
  toasts: Array<Toast>;
  addToast: (message: string) => void;
  removeToast: (uuid: string) => void;
};

export function useToastContext(): Context {
  const ToastContext = useContext(context);
  if (ToastContext) {
    return ToastContext;
  }
  throw new Error("Toast Context Is Null");
}

type Props = {
  children: React.ReactNode;
};

export default function ToastContext({ children }: Props) {
  const [toasts, setToasts] = useState<Array<Toast>>([]);
  const addToast = (message: string) => {
    const stateDupe = [...toasts];
    stateDupe.push({ message, id: v4(), submissionTime: new Date() });
    setToasts(stateDupe);
  };
  const removeToast = (uuid: string) => {
    const stateDupe = [...toasts].filter((toast) => toast.id !== uuid);
    setToasts(stateDupe);
  };
  return <context.Provider value={{ toasts, addToast, removeToast }}>{children}</context.Provider>;
}
