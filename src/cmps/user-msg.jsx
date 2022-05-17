import React from 'react'

import { eventBusService } from '../services/event-bus.service.js'


export class UserMsg extends React.Component {

    removeEvent;

    state = {
        msg: null
    }

    componentDidMount() {
        // Here we listen to the event that we emited, its important to remove the listener 
        this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
            this.setState({ msg })
            setTimeout(() => {
                this.setState({ msg: null })
            }, 2500)
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    render() {
        if (!this.state.msg) return <React.Fragment />
        const msgClass = this.state.msg.type || ''
        return (
            <section className={'user-msg ' + msgClass}>
                <button className='btn' onClick={() => {
                    this.setState({ msg: null })
                }}>x</button>
                <h1>{this.state.msg.txt}</h1>
            </section>
        )
    }
}


// import React, { useEffect, useState } from "react"

// function UserMsg({ message }) {
//     var removeEvent
//     const [msg, setMsg] = useState(message)
//     useEffect(() => {
//         removeEvent = eventBusService.on('show-user-msg', (msg) => {
//             setMsg({ msg })
//             setTimeout(() => {
//                 setMsg({ msg: null })
//             }, 2500)
//         })
//     }, [])


//     const msgClass = msg.type || ''
//     return <section className={'user-msg ' + msgClass}>
//         <button onClick={() => {
//             setMsg({ msg: null })
//         }}>x</button>
//         {msg.txt}
//     </section>
// }