import React, { useEffect, useRef } from 'react'
import { Button } from './styles/Button.styled'
import { NumberInput } from './styles/NumberInput.styled'

const CustomInputNumber = ({
  max = 10,
  min = 0,
  step = 1,
  name,
  value = 1,
  disabled = false,
  onChange,
  onBlur,
  onKeyDown,
  index,
  totalPeople,
  totalPeopleInRoom,
}) => {
  const numberRegex = /^[0-9\b]+$/

  const intervalRef = useRef(null)

  if (min > max) {
    min = 0
  }

  useEffect(() => {
    return () => stopCounter() // when App is unmounted we should stop counter
  }, [])

  const onCounterClickHold = e => {
    if (intervalRef.current) return

    const type = e.currentTarget.name

    if (type === 'plus' && value < max) {
      intervalRef.current = setInterval(() => {
        onChange(e, index, name, type, step)
      }, 200)
    }

    if (type === 'minus' && value > min) {
      intervalRef.current = setInterval(() => {
        onChange(e, index, name, type, step)
      }, 200)
    }
  }

  const onCounterClick = e => {
    const type = e.currentTarget.name

    if (type === 'plus' && value < max) {
      onChange(e, index, name, type, step)
    }

    if (type === 'minus' && value > min) {
      onChange(e, index, name, type, step)
    }
  }

  const onNumberInputChange = e => {
    const type = e.currentTarget.name

    if (!numberRegex.test(e.target.value) && type === 'quantity') return

    onChange(e, index, name, type, e.currentTarget.value)
  }

  const onNumberInputKeyDown = e => {
    onKeyDown(e, index, name)
  }

  const onNumberInputBlur = e => {
    const type = e.currentTarget.name

    if (totalPeople > max) {
      onBlur(e, index, name, type, step)
    }
  }

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    if (totalPeopleInRoom === 4 || value === min || totalPeople === max) {
      stopCounter()
    }
  }, [totalPeople])

  const btnStyleCondition = (key, isPlus = false) => {
    if (isPlus) {
      return (
        (totalPeople === max ? key : '') ||
        (value === 4 ? key : '') ||
        (totalPeopleInRoom === 4 ? key : '')
      )
    } else {
      return value === min ? key : ''
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <Button
        name="minus"
        cursor={btnStyleCondition('not-allowed')}
        opacity={btnStyleCondition('0.48')}
        hover={btnStyleCondition('#FFFFFF')}
        onClick={e => onCounterClick(e)}
        onMouseDown={e => onCounterClickHold(e)}
        onMouseUp={stopCounter}
        onBlur={e => onNumberInputBlur(e)}
        disabled={value === min}
      >
        <span>
          <i className="las la-minus" />
        </span>
      </Button>
      <NumberInput
        name={'quantity'}
        maxLength={max}
        minLength={min}
        step={step}
        inputMode="numeric"
        value={value}
        disabled={disabled}
        onChange={e => onNumberInputChange(e)}
        onBlur={e => onNumberInputBlur(e)}
        onKeyDown={e => onNumberInputKeyDown(e)}
      />
      <Button
        name="plus"
        cursor={btnStyleCondition('not-allowed', true)}
        opacity={btnStyleCondition('0.48', true)}
        hover={btnStyleCondition('#FFFFFF', true)}
        margin="0px 0px 0px 8px"
        onClick={e => onCounterClick(e)}
        onMouseDown={e => onCounterClickHold(e)}
        onMouseUp={stopCounter}
        onBlur={e => onNumberInputBlur(e)}
        disabled={totalPeople === max || value === 4 || totalPeopleInRoom === 4}
      >
        <span>
          <i className="las la-plus" />
        </span>
      </Button>
    </div>
  )
}

export default CustomInputNumber
