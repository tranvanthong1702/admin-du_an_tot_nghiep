import React, { useEffect, useState } from 'react'
import Echo from 'laravel-echo'
import Swal from 'sweetalert2'

function Notify() {
  window.Pusher = require('pusher-js')

  window.Echo = new Echo({

    broadcaster: 'pusher',

    key: '3eee181c7cfe21155631',

    cluster: 'ap1',

    forceTLS: true

  })
  // State lưu trữ danh sách các thông báo
  const profile1 = () => {
    const auth = localStorage.getItem('User') || null
    return auth ? JSON.parse(auth) : null
  }
  const user = profile1()
  const [data, setData] = useState([])

  useEffect(() => {
    var channel = window.Echo.channel('markverget')
    channel.listen('.ShopEvent', function(res) {
      console.log(res)
      if (1 == user.id) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: `${res.message.message}`
        })
      }
    })

  }, [])
  useEffect(() => {
    var channel = window.Echo.channel('markverget')
    channel.listen('.ShipperEvent', function(res) {
      console.log(res)
      if (res.message.user_id == user.id) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: `${res.message.message}`
        })
      }
    })

  }, [])
  // Ref của thành phần hiển thị số thông báo chưa đọc

  return (
    <>

    </>

  )
}

export default Notify