import HistoryContent from "@/components/HistoryContent";
import React, { Suspense, useEffect, useState } from "react";

const index = () => {
  return (
    <div>
      <h1>Watch History</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <HistoryContent />
      </Suspense>
    </div>
  );
};

export default index;
