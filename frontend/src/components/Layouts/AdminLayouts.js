
import SideMenu from "./AdminSideMenu";
import AdminSidebar from "./AdminSideMenu";


function Adminlayout({children}){


   
return(
    <div>
    
    <div class="container-fluid" id="main">
        

     <div class="row row-offcanvas row-offcanvas-left">
     
       
      <SideMenu/>
        
      
      
       {children}
      
   
 </div>
</div>  
</div>  


);
  
}

export default Adminlayout;