import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

/**
 * Composant backdrop standardisé pour tous les modals de l'application.
 * Applique un fond flouté uniforme et gère la fermeture au clic extérieur.
 * Utilise createPortal pour un rendu dans document.body.
 */
export default function ModalBackdrop({ children, onClose = function () {} }) {
  return ReactDOM.createPortal(
    <div
      onClick={function (e) {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
    >
      {children}
    </div>,
    document.body
  );
}

ModalBackdrop.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};
