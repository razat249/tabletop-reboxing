"use client";

import { createContext, useContext, useState } from "react";

interface RequestContextType {
  openRequest: () => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export function RequestProvider({
  children,
  onOpen,
}: {
  children: React.ReactNode;
  onOpen: () => void;
}) {
  return (
    <RequestContext.Provider value={{ openRequest: onOpen }}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequest() {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error("useRequest must be used within a RequestProvider");
  }
  return context;
}
