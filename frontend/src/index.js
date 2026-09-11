import React from "react";
import ReactDOM from "react-dom/client";
import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "@/App";

// react-pdf image (JPEG/PNG) decoding relies on a global Buffer, which CRA does
// not polyfill. Without it, images are silently dropped from the generated PDF.
if (typeof window !== "undefined" && !window.Buffer) {
  window.Buffer = Buffer;
}
if (typeof globalThis !== "undefined" && !globalThis.Buffer) {
  globalThis.Buffer = Buffer;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
