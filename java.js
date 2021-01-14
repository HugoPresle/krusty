function imgChange()
{
    var newImage= document.getElementById("newImg").value;
    console.log(newImage);
    document.getElementById("imgKrusty").path=newImage;
}

function selectedType(selected) 
{
    var type= selected.value;
    
    if (type=="cercle")
    {
        document.getElementById("cercleDiv").style.visibility="visible";
        document.getElementById("polygonesDiv").style.visibility="hidden";
        document.getElementById("carreDiv").style.visibility="hidden";
    }
    else if(type=="carre")
    {
        document.getElementById("carreDiv").style.visibility="visible";
        document.getElementById("cercleDiv").style.visibility="hidden";
        document.getElementById("polygonesDiv").style.visibility="hidden";
    }
    else if(type=="polygones")
    {
        document.getElementById("polygonesDiv").style.visibility="visible";
        document.getElementById("carreDiv").style.visibility="hidden";
        document.getElementById("cercleDiv").style.visibility="hidden";
    }
    
}


/*************************************************/
function objectMap(cheminImage,nomMap,tabObjectArea)
{
    this.cheminImage=cheminImage;
    this.nomMap=nomMap;
    this.tabObjectArea=tabObjectArea;

}
function objectAreaCarre(idArea,typeAire,ensemblePoint)
{
    this.idArea=idArea;
    this.typeAire=typeAire;
    this.ensemblePoint=ensemblePoint; //type ObjectPoint

}
function objectPoint(x,y)
{
    this.x=x;
    this.y=y;

}
function addCarre(point1,point2) 
{

    //crée l'element area
    var newArea=document.createElement("area");
    newArea.shape="rect";
    newArea.href="#";
    newArea.coords=point1.x+","+point1.y+","+point2.x+","+point2.y;
    
    //crée une div 
    var newdiv=document.createElement("div");
    newdiv.style.top=point1.x;
    newdiv.style.left=point1.y;
    newdiv.style.width=point2.x;
    newdiv.style.height=point2.y;
    newdiv.style.border="solid blue";
    newdiv.style.position="absolute";

    //affiche l'element area sur la map
    document.getElementById("krusty").insertAdjacentElement("beforeend",newArea);
    document.getElementById("divbord").insertAdjacentElement("afterbegin",newdiv);

    
}

function addRond(point1,point2,rayon) 
{

    //crée l'element area
    var newArea=document.createElement("area");
    newArea.shape="circle";
    newArea.href="#";
    newArea.coords=point1+","+point2+","+rayon;
    
    //crée une div 
    var newdiv=document.createElement("div");
    newdiv.style.top=parseInt(point1)-parseInt(rayon);
    newdiv.style.left=parseInt(rayon);
    newdiv.style.width=parseInt(point1)+parseInt(rayon);
    newdiv.style.height=parseInt(point2)+parseInt(rayon);
    newdiv.style.border="solid red";
    newdiv.style.position="absolute";
    newdiv.style.borderRadius="50%";

    //affiche l'element area sur la map
    document.getElementById("krusty").insertAdjacentElement("beforeend",newArea);
    document.getElementById("divbord").insertAdjacentElement("afterbegin",newdiv);

    
}
var objTab=[];
var id=1;
function createObj() 
{
    type= document.getElementById("type").value;
    act= document.getElementById("act").value;
    // tryCtach si ça ne marche pas 
    try 
    {
        if (type=="carre") 
        {  
            //POINT CARRE
            var point1 = new objectPoint(document.getElementById("x1").value,document.getElementById("y1").value);
            var point2 = new objectPoint(document.getElementById("x2").value,document.getElementById("y2").value);
            point=[point1,point2];
            addCarre(point1,point2);
        } 

        else if (type=="cercle")
        { 
            //POINT ROND
            var point1 = document.getElementById("x").value;
            var point2 = document.getElementById("y").value;
            var rayon= document.getElementById("R").value;
            addRond(point1,point2,rayon)
            point=[point1,point2,rayon];
        }
        else
        {
            point=[0];
        }
        
        var obj= new objectAreaCarre(id,type,point);
        id++;
        this.objTab.push(obj);
    } 
    catch (error) 
    {
       console.log(error); 
       window.alert("Un problème rencontré, veuillez ressayer.");
    }
    
    //TEST
    console.log(this.objTab);  
}

function Up() 
{
    var length=this.objTab.lenght;
    console.log(this.objTab[length]);
    window.alert("UP");
}

function Right() 
{
    window.alert("RIGHT"); 
}

function Left() 
{
    window.alert("LEFT"); 
}

function Down() 
{
    window.alert("Down"); 
}
