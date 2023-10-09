const Loader = () => {
    return (<div className="relative inline-block h-[35px] w-[35px] animate-spin78236">
    <div className="absolute h-full w-30% -bottom-5 left-0 transform rotate-60 origin-50% 85%">
        <div className="absolute h-0 w-full pb-full bg-[#5D3FD3] rounded-full animate-wobble1"></div>
    </div>
    <div className="absolute h-full w-30% -bottom-5 right-0 transform rotate-[-60deg] origin-50% 85%">
        <div className="absolute h-0 w-full pb-full bg-[#5D3FD3] rounded-full animate-wobble1 animate-delay-[-0.3s]"></div>
    </div>
    <div className="absolute h-full w-30% -bottom-[-5%] left-0 transform translate-x-[116.666%]">
        <div className="absolute h-0 w-full pb-full bg-[#5D3FD3] rounded-full animate-wobble2"></div>
    </div>
</div>
)}

export default Loader
