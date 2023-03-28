// Chakra imports
import {Box, Flex, Icon, Link, Text} from "@chakra-ui/react";
import PropTypes, {any, instanceOf, string} from "prop-types";
import React, {ReactElement} from "react";
import Footer from "@/components/footer/FooterAuth";
import FixedPlugin from "@/components/fixedPlugin/FixedPlugin";
// Custom components
// Assets
import {FaChevronLeft} from "react-icons/fa";

type AuthIllustrationProps = {
    illustrationBackground: {
        src: string
    },
    children: ReactElement
}
function AuthIllustration({children, illustrationBackground }: AuthIllustrationProps) {
    // Chakra color mode
    return (
        <Flex position='relative' h='max-content'>
            <Flex
                h={{
                    sm: "initial",
                    md: "unset",
                    lg: "100vh",
                    xl: "97vh",
                }}
                w='100%'
                maxW={{md: "66%", lg: "1313px"}}
                mx='auto'
                pt={{sm: "50px", md: "0px"}}
                px={{lg: "30px", xl: "0px"}}
                ps={{xl: "70px"}}
                justifyContent='start'
                direction='column'>
                <Link
                    to='/admin' style={{
                    width: "fit-content",
                    marginTop: "40px",
                }}>
                </Link>
                {children}
                <Box
                    display={{base: "none", md: "block"}}
                    h='100%'
                    minH='100vh'
                    w={{lg: "50vw", "2xl": "44vw"}}
                    position='absolute'
                    right='0px'>
                    <Flex
                        id={"background"}
                        bg={`url(${illustrationBackground.src})`}
                        justify='center'
                        align='end'
                        w='100%'
                        h='100%'
                        bgSize='cover'
                        bgPosition='50%'
                        position='absolute'
                        borderBottomLeftRadius={{lg: "120px", xl: "200px"}}>
                    </Flex>
                </Box>
                <Footer/>
            </Flex>
            <FixedPlugin/>
        </Flex>
    );
}

export default AuthIllustration;
