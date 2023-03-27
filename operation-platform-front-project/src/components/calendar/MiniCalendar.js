import React, {useState} from "react";
import "react-calendar/dist/Calendar.css";
import "./index.module.css";
import {Text, Icon} from "@chakra-ui/react";
// Chakra imports
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
// Custom components
import Card from "@/components/card/Card.js";
import dynamic from "next/dynamic";

// 仅仅动态加载,并且ssr为false,则标识不需要进行 服务端渲染
const Calendar = dynamic(() => import('react-calendar'), {ssr: false});
const zhCN = dynamic(() => import('date-fns/locale/zh-CN'), {ssr: false});

export default function MiniCalendar(props) {
    const {selectRange, ...rest} = props;
    const [value, onChange] = useState(new Date());
    return (
        <Card
            align='center'
            direction='column'
            w='100%'
            maxW='max-content'
            p='20px 15px'
            h='max-content'
            {...rest}>
            <Calendar
                locale={zhCN}
                onChange={onChange}
                value={value}
                selectRange={selectRange}
                view={"month"}
                tileContent={<Text color='brand.500'></Text>}
                prevLabel={<Icon as={MdChevronLeft} w='24px' h='24px' mt='4px'/>}
                nextLabel={<Icon as={MdChevronRight} w='24px' h='24px' mt='4px'/>}
            />
        </Card>
    );
}
