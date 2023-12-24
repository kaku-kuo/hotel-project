import React, { useState, useEffect } from 'react'
import CustomInputNumber from './CustomInputNumber'

const RoomAllocation = ({
  guest = 10,
  room = 3,
  watchResult = result => {
    console.log('result', result)
  },
}) => {
  const [roomData, setRoomData] = useState(null)

  const roomDataGenerator = (guest, room) => {
    let roomDetail = []

    for (let i = 0; i < room; i++) {
      roomDetail.push({ id: i, adult: 0, child: 0 })
    }

    for (let i = 0; i < guest; i++) {
      if (roomDetail[i] === undefined) break
      roomDetail[i].adult = 1
    }

    setRoomData(roomDetail)
  }

  useEffect(() => {
    roomDataGenerator(guest, room)
  }, [])

  useEffect(() => {
    watchResult(roomData)
  }, [roomData])

  if (!roomData) return

  const totalPeople = roomData.reduce((accu, curVal) => accu + curVal.adult + curVal.child, 0)

  const onChange = (e, index, name, type, value) => {
    const isOverTotalPeople = value + totalPeople > guest

    if (type === 'quantity') {
      // changing value by onChnage
      setRoomData(pre => {
        if (name === 'adult') {
          pre[index].adult = Number(value)
          return [...pre]
        } else {
          pre[index].child = Number(value)
          return [...pre]
        }
      })
    } else {
      // changing value by onClick
      setRoomData(pre => {
        if (name === 'adult') {
          pre[index].adult =
            type === 'plus'
              ? isOverTotalPeople
                ? pre[index].adult + (guest - totalPeople)
                : pre[index].adult + value
              : pre[index].adult - value

          if (pre[index].adult > 4) {
            pre[index].adult = 4
          }
          if (pre[index].adult < 0) {
            pre[index].adult = 0
          }
          return [...pre]
        } else {
          pre[index].child =
            type === 'plus'
              ? isOverTotalPeople
                ? pre[index].child + (guest - totalPeople)
                : pre[index].child + value
              : pre[index].child - value

          if (pre[index].child > 4) {
            pre[index].child = 4
          }
          if (pre[index].child < 0) {
            pre[index].child = 0
          }
          return [...pre]
        }
      })
    }
  }

  const onBlur = (e, index, name, type, value) => {
    if (type === 'quantity') {
      setRoomData(pre => {
        if (name === 'adult') {
          pre[index].adult = Number(value)
          return [...pre]
        } else {
          pre[index].child = Number(value)
          return [...pre]
        }
      })
    }
  }

  const onKeyDown = (e, index, name) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      setRoomData(pre => {
        if (name === 'adult') {
          if (String(pre[index].adult).length === 1) {
            pre[index].adult = ''
          }
          return [...pre]
        } else {
          if (String(pre[index].child).length === 1) {
            pre[index].child = ''
          }
          return [...pre]
        }
      })
    }
  }

  return (
    <div
      style={{
        padding: '16px',
        border: '1px solid rgb(191, 191, 191)',
        borderRadius: '4px',
      }}
    >
      <div>
        住客人數 : {guest} / {room}
      </div>
      {guest - totalPeople > 0 ? (
        <div
          style={{
            fontSize: '16px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            margin: '16px 0px',
            padding: '0px 16px',
            border: '1px solid rgb(30, 159, 210)',
            borderRadius: '4px',
            backgroundColor: 'rgba(30, 159, 210, 0.1)',
            color: 'gray',
          }}
        >
          尚未分配人數 : {guest - totalPeople}
        </div>
      ) : (
        <div
          style={{
            height: '50px',
            margin: '16px 0px',
          }}
        />
      )}
      {roomData.map((data, index) => (
        <div style={{ fontSize: '16px' }} key={`${data.id}-${index}`}>
          <div style={{ margin: '16px 0px' }}>房間 : {data.adult + data.child}人</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <div>
              <div>大人</div>
              <div>年齡 20+</div>
            </div>
            <div>
              <CustomInputNumber
                name="adult"
                max={guest}
                value={data.adult}
                index={index}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                totalPeople={totalPeople}
                totalPeopleInRoom={data.adult + data.child}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <div>
              <div>小孩</div>
            </div>
            <div>
              <CustomInputNumber
                name="child"
                max={guest}
                value={data.child}
                index={index}
                onChange={onChange}
                totalPeople={totalPeople}
                totalPeopleInRoom={data.adult + data.child}
              />
            </div>
          </div>
          <hr style={{ borderTop: '1px solid rgb(191, 191, 191)' }} />
        </div>
      ))}
    </div>
  )
}

export default RoomAllocation
