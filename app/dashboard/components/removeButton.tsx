"use client";
import Button from "@/app/components/button";
import { deleteTransaction } from "@/lib/Actions/deleteTransaction";
import { Loader, X } from "lucide-react";
import React, { useState } from "react";

export default function RemoveButton({
  id,
  onRemoved,
}: {
  id: number;
  onRemoved: () => void;
}) {
  const [loading, setLoading] = useState<undefined | boolean>();
  const [confirmed, setConfirmed] = useState<undefined | boolean>();
  const handleDelete = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    try {
      setLoading(true);
      await deleteTransaction(id);
      onRemoved();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size='xs'
      variant={confirmed ? "ghost" : "danger"}
      onClick={handleDelete}
      aria-disabled={loading}>
      {loading ? (
        <Loader className='h-4 w-4 animate-spin' />
      ) : (
        <X className='h-4 w-4' />
      )}
    </Button>
  );
}
