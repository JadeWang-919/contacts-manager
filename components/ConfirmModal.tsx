"use client";

import { useEffect, useRef } from "react";
import { FocusTrap } from "focus-trap-react";
import ModalPortal from "./ModalPortal";

interface ConfirmModalProps {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title = "Are you sure?",
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = document.getElementById("app-content");

    // Hide background
    if (app) {
      app.setAttribute("aria-hidden", "true");
      app.inert = true;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      if (app) {
        app.removeAttribute("aria-hidden");
        app.inert = false;
      }
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: () => modalRef.current!,
            escapeDeactivates: true,
            clickOutsideDeactivates: true,
            returnFocusOnDeactivate: false,
          }}
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 animate-fade-in outline-none"
          >
            <h2
              id="modal-title"
              className="text-lg font-semibold text-gray-900 mb-2"
            >
              {title}
            </h2>
            <p id="modal-description" className="text-sm text-gray-700 mb-6">
              {message}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-600 rounded-md transition"
              >
                Delete
              </button>
            </div>
          </div>
        </FocusTrap>
      </div>
    </ModalPortal>
  );
}
