import React from "react";
import { DevicesProvider } from "@/context/DevicesContext";

const DevicesLayout = ({ children }: { children: React.ReactNode }) => {
  return <DevicesProvider> {children}</DevicesProvider>;
};

export default DevicesLayout;
