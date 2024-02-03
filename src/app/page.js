"use client"

import { Box, Heading, Link, Flex, Text } from "@chakra-ui/react";
import styles from './page.module.css'
import { ListObjectsV2Command, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { useEffect, useState } from "react";


const Home = () => {
  const [objectList, setObjectList] = useState([]);
  const s3BucketEndpoint = "https://mwangangi-nextjs-website.s3.ap-southeast-1.amazonaws.com/";
  
  useEffect(() => {
    const fetchData = async () => {
      const region = "ap-southeast-1";
      const accessKeyId = process.env.NEXT_AWS_S3_ACCESS_KEY_ID;
      const secretAccessKey = process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY;

      const client = new S3Client({
        region: region,
        credentials: {
          accessKeyId: "AKIA6GBMBQBY7XMMT37M",
          secretAccessKey: "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",
        },
      });

      const getAllObjects = async () => {
        const listCommand = new ListObjectsV2Command({
          Bucket: "mwangangi-nextjs-website",
        });

        try {
          const listResponse = await client.send(listCommand);
          const objects = listResponse.Contents;
          console.log(objects)
          setObjectList(objects); // Set the object list to state
        } catch (err) {
          console.error(err);
        }
      };

      getAllObjects();
    };

    fetchData();
  }, []);



  return (
    <Box p={8} height={"100vh"} textAlign={'center'}>
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          MWANGANGI'S S3 BUCKET
        </Text>
        <Link href="/upload" color="teal.500" fontSize="lg">
          Upload File
        </Link>
      </Flex>

      {/* Body */}
      <Box>
        <Heading as="h1" fontSize="2xl" mb={4}>
          Media from MWANGANGI's S3 BUCKET
        </Heading>
      </Box>

      {/* Video Iframe */}
      {objectList.map((object) => (
        <Box
          key={object.Key} 
          mb={8} 
          className={`${styles.fadeIn} ${styles.centered}`} 
          height={'100%'} 
          width={'90%'} 
          marginLeft={'auto'}
          alignItems={'center'}
          marginBottom={'10px'}
          >
        
          <iframe
            width="100%"
            height="100%"
            src={s3BucketEndpoint + object.Key}
            title="Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Box>
      ))}
    </Box>
  );
};

export default Home;
