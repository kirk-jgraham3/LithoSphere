import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import { Button, Input, useDisclosure } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import SliderTool from './SliderTool';
import { SketchPicker } from 'react-color';

const SettingsDrawer = ({fov, onFovChange, intensity, onIntensityChange, bgColor, onColorChange}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  
    return (
      <div>
        <Button
          ref={btnRef}
          onClick={onOpen}
          size='lg'
          style={{position: 'absolute', top: '30px', right: '30px', zIndex: 1}}
        >
          <SettingsIcon/>
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Settings</DrawerHeader>
  
            <DrawerBody>
              <h3>Camera FOV</h3>
              <SliderTool value={fov} min={30} max={160} step={5} onChange={onFovChange} icon='view'/>
              
              <h3>Ambient Light Intensity</h3>
              <SliderTool value={intensity} min={0.0} max={100} step={0.1} onChange={onIntensityChange} icon='light'/>

              <h3>Background Color</h3>
              <SketchPicker color={bgColor} onChangeComplete={onColorChange}/>
            </DrawerBody>
  
            <DrawerFooter>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

export default SettingsDrawer;