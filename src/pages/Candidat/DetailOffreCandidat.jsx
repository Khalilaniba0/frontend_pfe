import React from "react";

import { ROUTES } from "constants/routes";
import JobDetail from "pages/Candidat/DetailOffrePublique";

export default function CandidateJobDetail() {
  return (
    <JobDetail
      showNavbar={false}
      forceCandidateApply={true}
      backToRoute={ROUTES.CANDIDATE.SPACE_OFFRES}
    />
  );
}
