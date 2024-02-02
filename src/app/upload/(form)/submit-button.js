"use client";
import { Button } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="submit-button" _disabled={pending} colorScheme={'teal'} >
      {pending ? "Uploading..." : "Upload File"}
    </Button>
  );
}