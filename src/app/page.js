import { Box, Heading, Link, Flex, Text } from "@chakra-ui/react";
import styles from './page.module.css'

const Home = () => {
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
          Videos from MWANGANGI's S3 BUCKET
        </Heading>
      </Box>

      {/* Video Iframe */}
      <Box mb={8} className={`${styles.fadeIn} ${styles.centered}`} >
        <iframe
          width="100%"
          height="400px"
          src="https://mwangangi-nextjs-website.s3.ap-southeast-1.amazonaws.com/WIN_20240202_18_10_40_Pro.mp4"
          title="Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </Box>
    </Box>
  );
};

export default Home;
