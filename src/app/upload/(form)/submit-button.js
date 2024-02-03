"use client";
import { Button, Alert, AlertIcon, Flex } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Flex flexDir={'column'} marginTop={'10px'} >
      
      <Button type="submit" className="submit-button" _disabled={pending} colorScheme={'teal'} width={'200px'} margin={'auto'} disabled={pending} isLoading={pending} loadingText="Uploading...">
        Upload File
      </Button>
      
      {pending &&(
        <Alert status='info'  marginTop={'5px'}>
          <AlertIcon />
          Kindly do not refresh the page until upload is complete
        </Alert>
        )}
    </Flex>
  );
}