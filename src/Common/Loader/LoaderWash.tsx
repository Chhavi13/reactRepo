import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import "./LoaderWash.scss"

function LoaderWash({ loadingWash }: any) {
    return (
        <div className={`${loadingWash && "loading-screen"}`}>
            <TailSpin
                height="80"
                width="80"
                color="#30426d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass='loader'
                visible={loadingWash}
            />
        </div>
    )
}

export default LoaderWash
