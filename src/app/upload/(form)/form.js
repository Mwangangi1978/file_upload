import {
    Input,
    Box,
    FormLabel,
    InputGroup,
    InputLeftElement,
    FormErrorMessage,
    Text,
    Icon,
    Button
  } from "@chakra-ui/react";
  import { MdCloudUpload } from "react-icons/md";
  
  
  
  import { useFormState } from "react-dom";
  import { uploadFile } from "@/app/upload/(form)/actions";
  import { SubmitButton } from "@/app/upload/(form)/submit-button";


  const initialState = {message: null}

  const UploadForm = ()=>{
    const acceptedFileTypes = "image/*, video/mp4";

    const [state, formAction] = useFormState(uploadFile, initialState);

    
    return(
        <Box 
            backgroundSize="cover"
            backgroundPosition="center"
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                p={6}
                borderRadius="md"
                boxShadow="md"
                textAlign="center"
                width={'50vw'}
            >
                <Text fontSize={'2xl'} fontStyle={'bold'} marginBottom={'20px'} color={'teal'}>Upload Files to S3 Bucket</Text>
                <form action={formAction}>
                    <InputGroup  style={{ display: 'flex', alignItems: 'center' }}>
                    
                    <InputLeftElement pointerEvents="none" fontSize="1.2em">
                        <Icon as={MdCloudUpload} />
                    </InputLeftElement>
                    <Input
                        name='file'
                        type="file"
                        id="file"
                        accepted={acceptedFileTypes}
                        marginTop={'5px'}
                    />
                    
                        
                    </InputGroup>
                    <SubmitButton/>
                </form>
                {state?.status && (
                    <Box
                        backgroundColor={state.status === 'success' ? '#B2F5EA' : '#FED7D7'}
                    >
                        <Text>{state?.message}</Text>
                    </Box>
                ) 
                }
            </Box>
        </Box>
    )
  }

  export default UploadForm;