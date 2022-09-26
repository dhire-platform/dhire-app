import {
  useColorMode,
  useColorModeValue,
  Box,
  BoxProps,
  Center,
} from '@chakra-ui/react';
import { HTMLMotionProps, motion, Variants } from 'framer-motion';

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<BoxProps, HTMLMotionProps<'div'>>;

const MotionBox: React.FC<MotionBoxProps> = motion(Box);

const Switch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const size = 24;

  const containerVariants: Variants = {
    dark: {
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
        // delay: 0,
      },
      backgroundColor: '#1A202C',
    },
    light: { backgroundColor: '#76A5FF' },
  };

  const childVariants: Variants = {
    dark: {
      y: 0,
      transition: {
        type: 'tween',
      },
    },
    light: {
      y: '-100px',
    },
  };

  return (
    <Center>
      <Box
        onClick={toggleColorMode}
        cursor="pointer"
        __css={{
          '.btn': {
            width: `${size * 2.1}px`,
            height: `${size}px`,
            borderRadius: `${size}px`,
            padding: `${size / 8}px`,
            boxSizing: 'content-box',
            display: 'flex',
            justifyContent: colorMode === 'dark' ? 'flex-end' : 'flex-start',
            overflow: 'hidden',
            pos: 'relative',
            '&::before': {
              transition: 'transform 0.3s linear',
              content: '""',
              backgroundColor: 'white',
              position: 'absolute',
              width: `${size * 0.3}px`,
              height: `${size * 0.3}px`,
              borderRadius: '50%',
              right: '15%',
              top: '20%',
              zIndex: 2,
              transform:
                colorMode === 'dark' ? 'translateY(100px)' : 'translateY(0)',
            },
            '&::after': {
              content: '""',
              transition: 'transform 0.3s linear',
              transitionDelay: '.1s',
              backgroundColor: 'white',
              position: 'absolute',
              width: `${size * 0.2}px`,
              height: `${size * 0.2}px`,
              borderRadius: '50%',
              right: '30%',
              top: '45%',
              zIndex: 2,
              transform:
                colorMode === 'dark' ? 'translateY(100px)' : 'translateY(0)',
            },
          },
          '.knob': {
            width: `${size}px`,
            height: `${size}px`,
            zIndex: '9999',
            borderRadius: `${size}px`,
          },
        }}
      >
        <motion.div
          className="btn"
          variants={containerVariants}
          initial={colorMode === 'dark' ? 'light' : 'dark'}
          exit={colorMode === 'dark' ? 'light' : 'dark'}
          animate={colorMode}
        >
          <MotionBox
            pos="absolute"
            top="70%"
            left="25%"
            width={`${size * 0.08}px`}
            height={`${size * 0.06}px`}
            borderRadius="50%"
            background="white"
            key="circle-2"
            variants={childVariants}
          ></MotionBox>
          <MotionBox
            pos="absolute"
            top="25%"
            left="15%"
            width={`${size * 0.3}px`}
            height={`${size * 0.3}px`}
            background="white"
            key="subheading1"
            clipPath="polygon(50% 0%, 63% 38%, 100% 38%, 69% 59%, 82% 100%, 50% 75%, 18% 100%, 31% 59%, 0 38%, 37% 38%)"
            borderRadius="50%"
            variants={childVariants}
          ></MotionBox>
          <MotionBox
            pos="absolute"
            top="60%"
            left="45%"
            width={`${size * 0.2}px`}
            height={`${size * 0.2}px`}
            borderRadius="58%"
            clipPath="polygon(50% 0%, 63% 38%, 100% 38%, 69% 59%, 82% 100%, 50% 75%, 18% 100%, 31% 59%, 0 38%, 37% 38%)"
            background="white"
            key="subheading2"
            variants={childVariants}
          ></MotionBox>
          <MotionBox
            borderRadius="50%"
            pos="absolute"
            top="40%"
            left="35%"
            width={`${size * 0.1}px`}
            height={`${size * 0.1}px`}
            background="white"
            key="circle-1"
            variants={childVariants}
          ></MotionBox>
          <MotionBox
            pos="absolute"
            top="25%"
            left="55%"
            width={`${size * 0.08}px`}
            height={`${size * 0.08}px`}
            borderRadius="50%"
            background="white"
            key="circle-2"
            variants={childVariants}
          ></MotionBox>
          <motion.div
            layout
            animate={colorMode}
            variants={{
              dark: {
                boxShadow: 'inset 0px 13px white, inset 0px 13px 1px 1px white',
                rotate: 90,
                background: 'transparent',
              },
              light: {
                boxShadow: 'inset 0px 0px white, inset 0px 0px 0px 0px white',
                rotate: 90,
                background: '#fff',
              },
            }}
            initial={false}
            className="knob"
          />
        </motion.div>
      </Box>
    </Center>
  );
};

export default Switch;
