import {Flex, Input, InputGroup} from "@chakra-ui/react"
 
export function RightContent() {
    return <Flex>
        <InputGroup size='sm' display='flex'>
        <Input variant='outline' placeholder="Search..." />
        </InputGroup>
    </Flex>
}