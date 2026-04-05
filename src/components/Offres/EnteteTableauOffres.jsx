// Lignes : 34 | Couche : composant | Depend de : react
import React from "react";
import PropTypes from "prop-types";

export default function JobsTableHeader({ total }) {
  return (
    <div className="flex items-center border-b border-border bg-bg-soft/50 px-6 py-4">
      <div className="flex items-center gap-3">
        <h3 className="font-display text-lg font-semibold text-text-primary">
          Postes Ouverts
        </h3>
        <span className="flex h-6 items-center rounded-full bg-primary/10 px-2.5 font-body text-xs font-semibold tabular-nums text-primary">
          {total}
        </span>
      </div>
    </div>
  );
}

JobsTableHeader.propTypes = {
  total: PropTypes.number.isRequired,
};
