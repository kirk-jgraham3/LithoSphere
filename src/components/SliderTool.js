import React from 'react';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Tooltip
  } from '@chakra-ui/react'
import { ViewIcon, SunIcon } from '@chakra-ui/icons'

const icons = {
    view: ViewIcon,
    light: SunIcon
  };

const SliderTool = ({ value, min, max, step, onChange, icon }) => {
    const [sliderValue, setSliderValue] = React.useState(value)
    const [showTooltip, setShowTooltip] = React.useState(false)
    const qMarker1 = (max-min)/4 + min;
    const qMarker2 = (max-min)/2 + min;
    const qMarker3 = 3*(max-min)/4 + min;
    const IconComponent = icons[icon];

    const handleChange = (v) => {
        setSliderValue(v)
        onChange(v)
    }

    return (
        <div style={{width: '90%'}}>
            <Slider
                id='slider'
                defaultValue={value}
                min={min}
                max={max}
                step={step}
                colorScheme='teal'
                onChange={handleChange}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>

                <SliderMark value={min}>{min}</SliderMark>
                <SliderMark value={qMarker1}>{qMarker1}</SliderMark>
                <SliderMark value={qMarker2}>{qMarker2}</SliderMark>
                <SliderMark value={qMarker3}>{qMarker3}</SliderMark>
                <SliderMark value={max}>{max}</SliderMark>

                <Tooltip
                    hasArrow
                    bg='teal.500'
                    color='white'
                    placement='top'
                    isOpen={showTooltip}
                    label={`${sliderValue}º`}
                >
                    <SliderThumb boxSize={6}>
                        <IconComponent />
                    </SliderThumb>
                </Tooltip>
            </Slider>
        </div>
    );
}

export default SliderTool;