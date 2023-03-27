// Chakra Imports
import {Button, Icon, useColorMode} from "@chakra-ui/react";
// Custom Icons
import {IoMdMoon, IoMdSunny} from "react-icons/io";
import React, {useEffect, useState} from "react";

export default function FixedPlugin(props) {
    const {...rest} = props;
    const {colorMode, toggleColorMode} = useColorMode();
    let bgButton = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";
    const [leftDir, setLeftDir] = useState("")
    const [rightDir, setRightDir] = useState("")
    useEffect(() => {
        if (document.documentElement.dir === 'rtl') {
            setLeftDir('35px')
        } else {
            setRightDir('35px')
        }
    }, [])
    return (
        <Button
            {...rest}
            h='60px'
            w='60px'
            bg={bgButton}
            zIndex='99'
            position='fixed'
            variant='no-effects'
            left={leftDir}
            right={rightDir}
            bottom='30px'
            border='1px solid'
            borderColor='#6A53FF'
            borderRadius='50px'
            onClick={toggleColorMode}
            display='flex'
            p='0px'
            align='center'
            justify='center'>
            <Icon
                h='24px'
                w='24px'
                color='white'
                as={colorMode === "light" ? IoMdMoon : IoMdSunny}
            />
        </Button>
    );
}
