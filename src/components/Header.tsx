import { Button, Flex, HStack, Text } from '@chakra-ui/react';


import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import React from 'react';


const Header = () => {
    return (
        <Flex
            as={motion.nav}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition="0.3s ease-in"
            align="center"
            justify="space-between"
            p={4}
        >
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Text>LOGO</Text>
            </motion.div>
            <HStack spacing={8} alignItems="center">
                <ThemeToggle />

                <Button variant="outline">Login</Button>
            </HStack>
        </Flex>
    );
};

export default Header;