import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Error() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <img src="/404.svg" alt="" className="" />
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-6">Page Not Found</h1>
                <p className="text-xl mb-8">We're sorry, the page you requested could not be found.<br />
                    Please go back to the homepage.</p>
                <NavLink to='/'>
                    <button className="px-6 py-3 bg-green-600 hover:bg-green-700 transition text-white rounded-lg text-lg font-semibold shadow-lg">
                        Go Home
                    </button>
                </NavLink>
            </div>
        </div>
    )
}