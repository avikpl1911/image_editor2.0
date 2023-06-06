import React from 'react'
import "./home.css"
import Navbar from '../../components/navbar/Navbar'
import { useState,useEffect } from 'react'
import {BsFillArrowUpSquareFill,BsFillArrowLeftSquareFill,BsFillArrowDownSquareFill,BsFillArrowRightSquareFill} from "react-icons/bs"
import { AiOutlineZoomIn,AiOutlineZoomOut } from "react-icons/ai";
import { useRef } from 'react'
import init, { grayscale,blur } from "wasm-lib";
import ReactCrop from "react-image-crop";
import ImageCrop from '../cropIMAGE/CropImage'

function Home() {
  const [img,setImg] = useState("")
  const [zoom,setZoom] = useState(1);
  const [imgUploaded,setImgUploaded] = useState(false);
  const uploadInput= useRef(null);
  const [cropbuttonPress,setcropbuttonPress]= useState(false)
  const [croppedImage, setCroppedImage] = useState(null);

  
  const IMGref = useRef(null);
  const filereader = new FileReader();
  const handleUpload = ()=>{
    uploadInput.current.click()
  }

  const changeIMGonUpload = async()=>{
    console.log(uploadInput.current.files[0])
    
    const fileReader = new FileReader()
    
      fileReader.readAsDataURL(uploadInput.current.files[0])   
      
      

      fileReader.onloadend=()=>{
        setImg(fileReader.result)
        
      }
      
      
   
     setImgUploaded(true)
  }
  // filereader.readAsDataURL();

  


  const handleZoomplus = ()=>{
       setZoom(zoom + 0.5)
       
  }

  const handleZoomminus = ()=>{
    if(zoom>1){
      setZoom(zoom - 0.5)
    }}

  const handleGrayscale = async()=>{
    
  init().then(setImg(blur(img.replace(
    /^data:image\/(png|jpeg|jpg);base64,/, ''
)
)))
 

  }

  const UploadIMGbtnShow = ()=>{
    return(
      <>
      <input ref={uploadInput} type="file" accept=".png" className="hidden" onChange={changeIMGonUpload}/>
             <div className="HomebuttonUpload" onClick={handleUpload}>
              <span className="homeimageuploadtext">IMAGE</span>
             </div>
        </>
    )
  }
   
  useEffect(() => {
    if (img) {
      const cropper = new ReactCrop({
        img,
        onCropComplete: (cropped) => {
          setCroppedImage(cropped);
        },
      });
    }
  }, [img]);


  const convertToBase64 = () => {
    const canvas = document.createElement('canvas');
    canvas.width = croppedImage.width;
    canvas.height = croppedImage.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(croppedImage, 0, 0);
    const base64Image = canvas.toDataURL('image/jpeg');
    setCroppedImage(base64Image);
  };

  const ImageShow = ()=>{
    return(<>
           <div className="contain" style={{objectFit:"contain"}}>
    {!cropbuttonPress ?<img  src={img} ref={IMGref} style={{transform:`scale(${zoom})`}} alt="" />
    :
    <ImageCrop img={img} />
    }
          <div className='zoomOptions'>
            <div className="zoomoptionsContainer">
            
               <div className="zoomcrtlOpt">
               <div className="zoomplus pointerCursor" onClick={handleZoomplus}>
                    <AiOutlineZoomIn color='white' className='iconcrtl' />
               </div>
               <div className="zoomminus pointerCursor" onClick={handleZoomminus}>
                    <AiOutlineZoomOut color='white' className='iconcrtl' />
               </div>
               </div>
               
            </div>
             
          </div>
          </div>
          </>)
  }
      
  
  return (
  
  <div className='homeContainer'>
    <div className="homenavContainer">
        <Navbar/>
    </div>
    <div className="homeBottomContainer">
         <div className="homeBottomContainerLeft">
          <div className="homeEditOptions">
            <div className="editTitle">
              Edit
              <div className="Homeeditoptions">
                 
                <div className="filters">
                  <div className="filtercontainer">
                    <div className="filter-image">
                         <img src="https://thumbs.dreamstime.com/b/grayscale-square-texture-empty-grunge-pattern-photographers-designers-33206980.jpg" height="80px" width="80px" alt="" />
                    </div>
                    <p className="filter-textcontainer">
                      
                        Grayscale
                      
                    </p>
                  </div>
                  
                  <div className="filtercontainer">
                    <div className="filter-image">
                         <img src="https://thumbs.dreamstime.com/b/square-blur-texture-blur-plaid-abstract-background-grunge-effect-square-glass-blur-background-98717560.jpg" height="80px" width="80px" alt="" />
                    </div>
                    <p className="filter-textcontainer">
                      
                        Blur
                      
                    </p>
                  </div>
                  <div className="filtercontainer">
                    <div className="filter-image">
                         <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/32daf955-eae8-466a-8597-37cbf4bd6976/d2pz59i-42583e09-3f5d-4db3-9ce4-42b155a2b169.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi8zMmRhZjk1NS1lYWU4LTQ2NmEtODU5Ny0zN2NiZjRiZDY5NzYvZDJwejU5aS00MjU4M2UwOS0zZjVkLTRkYjMtOWNlNC00MmIxNTVhMmIxNjkuanBnIn1dXX0.QyJr_LilzmPL5IsCveHxtBcRiu-VxpSoqv5YAqPBCz8" height="80px" width="80px" alt="" />
                    </div>
                    <p className="filter-textcontainer">
                      
                        Sepia
                      
                    </p>
                  </div>
                </div>
                 <div className="cropedit">
                  <div className="cropButton" onClick={()=>{setcropbuttonPress(!cropbuttonPress)}}>
                    Crop
                  </div>
                 </div>
              </div>
            </div>

          </div>
         </div>
         <div className="homeBottomContainerRight" >
            {imgUploaded ? <ImageShow/> : <UploadIMGbtnShow/>}
         </div>
    </div>
   </div>
  
  )
}

export default Home