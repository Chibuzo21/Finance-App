import React from "react";

export default function NotFound() {
  return (
    <>
      <div className="font-semibold text-4xl mb-8">Transaction not found</div>
      <p className="text-gray-400 dark:text-gray-500">
        Transaction could not be found or could not be fetched
      </p>
    </>
  );
}
