"use client";

import {
  Box,
  Button,
  VStack,
  Text,
  Icon,
  useColorModeValue,
  Divider,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  EditIcon,
  SettingsIcon,
  ChevronDownIcon,
  LockIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be replaced with actual auth state
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      as='nav'
      pos='fixed'
      left={0}
      h='100vh'
      w='240px'
      bg={bgColor}
      borderRight='1px'
      borderColor={borderColor}
      py={5}
    >
      <VStack spacing={6} align='stretch' px={4}>
        {/* Logo/Brand */}
        <Text
          fontSize='2xl'
          fontWeight='bold'
          color='blue.400'
          textAlign='center'
          mb={4}
        >
          Alignly.io
        </Text>

        <Divider />

        {isLoggedIn ? (
          // Logged in user view
          <>
            {/* User Profile */}
            <Menu>
              <MenuButton
                as={Button}
                variant='ghost'
                w='full'
                display='flex'
                alignItems='center'
                justifyContent='start'
                gap={3}
              >
                <Avatar size='sm' />
                <Text>User Name</Text>
                <ChevronDownIcon ml='auto' />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem color='red.400'>Logout</MenuItem>
              </MenuList>
            </Menu>

            {/* Main Navigation */}
            <VStack spacing={2} align='stretch'>
              <Button
                variant='ghost'
                leftIcon={<Icon as={EditIcon} />}
                justifyContent='start'
              >
                My Notes
              </Button>
              <Button
                variant='ghost'
                leftIcon={<Icon as={CalendarIcon} />}
                justifyContent='start'
              >
                Reminders
              </Button>
              <Button
                variant='ghost'
                leftIcon={<Icon as={SettingsIcon} />}
                justifyContent='start'
              >
                Settings
              </Button>
            </VStack>
          </>
        ) : (
          // Non-logged in user view
          <VStack spacing={4}>
            <Button
              colorScheme='blue'
              leftIcon={<Icon as={LockIcon} />}
              w='full'
            >
              Sign In
            </Button>
            <Button variant='outline' colorScheme='blue' w='full'>
              Create Account
            </Button>
            <Text fontSize='sm' color='gray.500' textAlign='center'>
              Join to start organizing your notes with AI
            </Text>
          </VStack>
        )}

        {/* Footer Links - Visible to all */}
        <VStack mt='auto' pt={6} spacing={2}>
          <Divider />
          <Link href='/about' passHref>
            <Button as='a' variant='ghost' size='sm' w='full'>
              About
            </Button>
          </Link>
          <Link href='/privacy' passHref>
            <Button as='a' variant='ghost' size='sm' w='full'>
              Privacy Policy
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
}
