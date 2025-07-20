import React, { useState } from 'react'


const ShareModal = ({showModal,setShowModal}) => {

  return (
    <>
    {showModal && (

      <div className="w-full fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
        <div className="h-full flex justify-center items-center">
            <div className="w-md h-[70vh] bg-[#E7E5E4] text-[#1E293B] py-6 px-6 rounded-md shadow-md relative ">
                <h1 className="text-xl font-bold">Share weather</h1>
                <div className="my-6 h-[60%] bg-[url('https://static.vecteezy.com/system/resources/thumbnails/001/978/595/small/desert-panorama-background-with-palm-trees-free-vector.jpg')] bg-repeat-no-repeat bg-cover rounded-md px-6 py-4">
                    <div className="flex flex-col">
                    <h4 className='text-5xl font-semibold text-white'>34 °c</h4>
                    <div className="h-[0.5px] w-22 bg-[#e7e5e4a9] mt-4"></div>
                    <h5 className='text-lg font-medium text-white text-left'>Sun</h5>
                    <span className='text-md font-normal text-[#fcfcfccd] text-left'>July 21 Karachi</span>
                    </div>
                </div>
                <div className="w-full absolute bottom-0 my-4 flex justify-between left-0 px-6">
                    <button className="bg-[#6366f1] text-white px-8 py-2 rounded-full hover:bg-[#E7E5E4] hover:border border-[#828282] hover:text-black transition duration-200 cursor-pointer">Share</button>
                    <button className="bg-[#e7e5e4] text-black border px-8 py-2 rounded-full hover:bg-[#6366f1] hover:border-none border-[#828282] hover:text-white transition duration-200 cursor-pointer" onClick={() => setShowModal(!showModal)}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
    )}
    </>
  )
}

export default ShareModal
