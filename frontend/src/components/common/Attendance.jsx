import React from 'react'

const Attendance = () => {
  return (
    <>
       <div className="w-full pr-[200px] bg-bgsec">
          <div className=" mx-auto rounded-[20px] bg-[#E7E9FB] p-8 mt-[50px] flex h-[510px]  w-[900px]">
            <div className="w-1/3  h-full">
                <div className="w-full flex justify-center">
                
                
       

                <button
                  onClick={onSubmit}
                  type="button"
                  className="transition w-[25%] rounded-[100px] duration-200 bg-[#2E4960] hover:bg-[#2E4960] focus:bg-[#2E4960] focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white py-2.5 text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Update profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[100px] bg-bgsec"></div>  
    </>
  )
}

export default Attendance